import { test } from 'node:test';
import assert from 'node:assert/strict';
import { patterns } from '../src/catalog/patterns.ts';
import { recipes } from '../src/catalog/recipes.ts';
import { scenes } from '../src/catalog/scenes.ts';
import data from '../src/catalog/audit-data.json' with {type:'json'};
const field=(value:unknown,path:string)=>path.split('.').reduce<unknown>((v,k)=>v&&typeof v==='object'?Reflect.get(v,k):undefined,value);
test('Every source reference resolves to a preserved record',()=>{
 for(const study of [...patterns,...recipes])for(const source of study.sources)assert.notEqual(field(data[source.site],source.field),undefined,study.id+' → '+source.site+'.'+source.field);
});
test('Deep links, track identities and recipe building blocks stay valid',()=>{
 for(const registry of [patterns,recipes]){assert.equal(new Set(registry.map(s=>s.id)).size,registry.length);for(const study of registry){assert.equal(new Set(study.tracks.map(t=>t.id)).size,study.tracks.length);for(const track of study.tracks){assert.ok(track.startMs>=0&&track.durationMs>=0);if(study.durationMs>0)assert.ok(track.startMs+track.durationMs<=study.durationMs,study.id+': '+track.id);}for(const id of study.patternIds??[])assert.ok(patterns.some(p=>p.id===id),study.id+' → '+id);}}
 for(const scene of scenes)for(const id of scene.recipeIds)assert.ok(recipes.some(r=>r.id===id),scene.id+' → '+id);
});
test('Native and gesture studies do not pretend to have a shared timed duration',()=>{
 for(const study of [...patterns,...recipes])if(study.driver==='native'||study.driver==='interaction')assert.equal(study.durationMs,0,study.id);
});
test('Hybrid recipes retain provenance from more than one site',()=>{
 assert.equal(recipes.length,5);assert.equal(scenes.length,3);for(const recipe of recipes)assert.ok(new Set(recipe.sources.map(s=>s.site)).size>=2,recipe.id);
});
