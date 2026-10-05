import {test} from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/scenario.js';
import {seed} from '../lib/engine.js';
function response(){return {code:200,headers:{},setHeader(k,v){this.headers[k]=v;},status(n){this.code=n;return this;},json(data){this.data=data;return this;}};}
test('manual and natural language routes use authoritative calculations',async()=>{const res=response();await handler({method:'POST',headers:{host:'localhost:3000'},body:{manual:true,state:seed(),amount:20000}},res);assert.equal(res.data.result.savings,16000);const nl=response();await handler({method:'POST',headers:{host:'localhost:3000'},body:{state:seed(),question:'₹20k Goa without reducing dinners with friends'}},nl);assert.equal(nl.data.mode,'demo');assert.equal(nl.data.result.paths[1].savings,19300);});
test('scope and origin boundaries are enforced on server',async()=>{const res=response();await handler({method:'POST',headers:{host:'localhost:3000'},body:{state:seed(),question:'Which stocks should I buy?'}},res);assert.equal(res.data.blocked,true);const forbidden=response();await handler({method:'POST',headers:{host:'localhost:3000',origin:'https://evil.example'},body:{}},forbidden);assert.equal(forbidden.code,403);});
