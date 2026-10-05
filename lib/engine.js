export const categories = [
 {id:'housing',name:'Housing & bills',budget:24000,spent:24000,locked:true},
 {id:'groceries',name:'Groceries',budget:6000,spent:3600,locked:true},
 {id:'transport',name:'Transport',budget:4000,spent:1800,locked:true},
 {id:'dining',name:'Dinners with friends',budget:6000,spent:2400,locked:false},
 {id:'delivery',name:'Food delivery',budget:5000,spent:1600,locked:false},
 {id:'shopping',name:'Shopping',budget:6000,spent:1000,locked:false},
 {id:'subscriptions',name:'Subscriptions',budget:3000,spent:3000,locked:false}
];
export const transactions=[['01 Oct','Salary','income',90000],['02 Oct','Rent & utilities','housing',-24000],['03 Oct','Monthly subscriptions','subscriptions',-3000],['05 Oct','Groceries','groceries',-3600],['08 Oct','Metro & cabs','transport',-1800],['10 Oct','Dinner with friends','dining',-2400],['12 Oct','Food delivery','delivery',-1600],['14 Oct','Shopping','shopping',-1000]].map(([date,merchant,category,amount],i)=>({id:i+1,date,merchant,category,amount}));
export function seed(){return {income:90000,goal:30000,protected:['housing','groceries','transport'],transactions,captured:[],payday:1,fixedCosts:[{id:'rent',name:'Rent & utilities',amount:24000,day:2},{id:'maid',name:'Maid',amount:3000,day:5},{id:'cook',name:'Cook',amount:4000,day:5},{id:'sip',name:'Existing SIP commitment',amount:5000,day:7}],decisions:[]};}
export function validate(s){
 if(!s || !Number.isInteger(s.goal)||s.goal<0||s.goal>1000000 || !Number.isInteger(s.income)||s.income<0||s.income>10000000) throw Error('Enter valid whole-rupee income and goal.');
 if(!Array.isArray(s.protected)||s.protected.some(x=>!categories.some(c=>c.id===x))) throw Error('Invalid category.');
 const captured=Array.isArray(s.captured)?s.captured.filter(t=>Number.isInteger(t.amount)&&t.amount<0&&Math.abs(t.amount)<=1000000&&typeof t.merchant==='string'&&t.merchant.length<=80&&categories.some(c=>c.id===t.category)).slice(-100):[];
 const fixedCosts=Array.isArray(s.fixedCosts)?s.fixedCosts.filter(x=>typeof x.name==='string'&&x.name.length<=60&&Number.isInteger(x.amount)&&x.amount>=0&&x.amount<=1000000&&Number.isInteger(x.day)&&x.day>=1&&x.day<=31).slice(0,20):seed().fixedCosts;
 return {...seed(),income:s.income,goal:s.goal,protected:[...new Set([...s.protected,...categories.filter(c=>c.locked).map(c=>c.id)])],captured,fixedCosts,payday:Number.isInteger(s.payday)&&s.payday>=1&&s.payday<=31?s.payday:1};
}
const capturedTotal=s=>(s.captured||[]).reduce((a,t)=>a+Math.abs(t.amount),0);
const capturedFor=(s,id)=>(s.captured||[]).filter(t=>t.category===id).reduce((a,t)=>a+Math.abs(t.amount),0);
export function financial(s){const spend=categories.reduce((a,c)=>a+c.budget,0)+capturedTotal(s);const spent=categories.reduce((a,c)=>a+c.spent,0)+capturedTotal(s);return {spend,spent,remaining:Math.max(0,spend-spent),savings:s.income-spend,headroom:s.income-spend-s.goal};}
export function simulate(s,amount,extra=[]){
 if(!Number.isInteger(amount)||amount<0||amount>1000000)throw Error('Expense must be between ₹0 and ₹10,00,000.');
 const f=financial(s),savings=f.savings-amount,shortfall=Math.max(0,s.goal-savings);
 const flexible=categories.filter(c=>!s.protected.includes(c.id)&&!extra.includes(c.id));
 const cuts=flexible.map(c=>({category:c.name,amount:Math.min(Math.max(0,c.budget-c.spent-capturedFor(s,c.id)),Math.round(c.budget*.3))})).filter(c=>c.amount>0);
 const recovered=cuts.reduce((a,c)=>a+c.amount,0);
 return {amount,baseline:f.savings,savings,shortfall,protected:[...new Set([...s.protected,...extra])],paths:[
 {id:'unchanged',title:'Keep your rhythm',savings,cost:amount,detail:'Keep all category budgets unchanged.'},
 {id:'flexible',title:'Use flexible spending',savings:savings+recovered,cost:amount,cuts,detail:recovered?`Explore smaller remaining budgets in ${cuts.map(c=>c.category).join(', ')}.`:'No remaining flexible capacity with these protections.'},
 {id:'smaller',title:'Resize the plan',savings:f.savings-Math.max(0,amount-shortfall),cost:Math.max(0,amount-shortfall),detail:'Explore a smaller expense against the same savings target.'}
 ],assumption:'Illustrative October 2026 monthly budget. Income and category budgets are assumed unchanged; unrecorded obligations are excluded.'};
}
export const outsideScope=q=>/\b(stock|stocks|securities|mutual\s+fund|portfolio|invest\w*|crypto\w*|bitcoin|loan\w*|borrow\w*|credit|insurance|insur\w*|gold|emi|mortgage)\b/i.test(q);
export function parseDemo(q){const m=q.match(/(?:₹|rs\.?\s*|inr\s*)?(\d[\d,]*(?:\.\d+)?)\s*(k|thousand|lakh)?/i);if(!m)throw Error('Include an expense amount, for example ₹20,000.');let amount=Number(m[1].replaceAll(',',''))*({k:1000,thousand:1000,lakh:100000}[m[2]?.toLowerCase()]||1);const protect=/\b(keep|protect|without|don.t reduce|unchanged)\b/i.test(q)?categories.filter(c=>new RegExp(c.id==='dining'?'dinner|friends|dining':c.id,'i').test(q)).map(c=>c.id):[];return {amount,protect};}
