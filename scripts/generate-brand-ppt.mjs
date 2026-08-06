import fs from "node:fs/promises";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const root = process.env.AXION_ROOT || process.cwd();
const output = `${root}/public/brand-assets/Axion-Corporate-Identity.pptx`;
const renderDir = process.env.AXION_PPT_RENDER || "/private/tmp/axion-ci-render";
const c = { navy:"#071D33", cobalt:"#316BFF", steel:"#6F8FB0", amber:"#F2B441", coral:"#D95D58", ice:"#EEF3F8", white:"#FFFFFF", ink:"#10273D", muted:"#526A80", line:"#C5D2DF" };
const deck = Presentation.create({ slideSize:{ width:1280, height:720 } });

async function fileBytes(path){ const b=await fs.readFile(path); return b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength); }
function shape(slide,x,y,w,h,fill,r=18,line="none"){
  return slide.shapes.add({ geometry:r?"roundRect":"rect", position:{left:x,top:y,width:w,height:h}, fill, line:{style:"solid",fill:line,width:line==="none"?0:1}, borderRadius:r>=18?"rounded-2xl":"rounded-xl" });
}
function text(slide,value,x,y,w,h,size,color,opt={}){
  const item=slide.shapes.add({ geometry:"textbox", position:{left:x,top:y,width:w,height:h}, fill:"none", line:{style:"solid",fill:"none",width:0} });
  item.text=value;
  item.text.style={ fontFamily:opt.mono?"DM Mono":"Manrope", fontSize:size, color, bold:opt.bold||false, alignment:opt.align||"left", verticalAlignment:opt.valign||"top" };
  return item;
}
async function image(slide,path,x,y,w,h,fit="cover",radius="rounded-2xl"){
  const ext=path.split(".").pop().toLowerCase();
  const contentType=ext==="svg"?"image/svg+xml":ext==="jpg"||ext==="jpeg"?"image/jpeg":"image/png";
  return slide.images.add({
    blob:await fileBytes(path),
    contentType,
    alt:path.split("/").pop(),
    fit,
    position:{left:x,top:y,width:w,height:h},
    geometry:radius==="none"?"rect":"roundRect",
    ...(radius==="none"?{}:{borderRadius:radius}),
  });
}
async function mark(slide,x,y,size,light=false){ return image(slide,`${root}/public/brand-assets/${light?"axion-mark-mono-white.svg":"axion-mark-navy.svg"}`,x,y,size,size,"contain","rounded-xl"); }
function footer(slide,n,dark=false){ text(slide,"AXION PROCESS OS · CORPORATE IDENTITY · 2026",64,680,620,18,11,dark?"#AFC2D4":c.muted,{mono:true}); text(slide,String(n).padStart(2,"0"),1160,680,56,18,11,dark?"#AFC2D4":c.muted,{mono:true,align:"right"}); }
function heading(slide,eyebrow,title,sub,dark=false){ text(slide,eyebrow.toUpperCase(),64,52,720,24,13,dark?"#8FB0FF":c.cobalt,{mono:true,bold:true}); text(slide,title,64,92,1000,58,38,dark?c.white:c.ink,{bold:true}); if(sub)text(slide,sub,64,168,980,48,18,dark?"#C8D7E5":c.muted); }

{
  const s=deck.slides.add(); s.background.fill=c.navy;
  await image(s,`${root}/assets/photography/vaccine-bioreactor-plant.jpg`,720,0,560,720,"cover","none"); shape(s,690,0,150,720,c.navy,0);
  text(s,"CORPORATE IDENTITY",72,78,520,28,14,"#8FB0FF",{mono:true,bold:true}); text(s,"Axion\nProcess OS",72,174,560,164,60,c.white,{bold:true});
  text(s,"One coherent visual system for bioprocess engineering software, reports, presentations, and partners.",72,378,540,104,22,"#C8D7E5");
  await mark(s,72,552,84,true); text(s,"BIOPROCESS ENGINEERING, CONNECTED.",178,574,420,22,13,c.white,{mono:true,bold:true}); footer(s,1,true);
}
{
  const s=deck.slides.add(); s.background.fill=c.ice; heading(s,"Brand idea","Biology in controlled flow.","Axion makes complex production systems legible without making them generic or ornamental."); await mark(s,1080,48,92);
  [["01","Organic","Living systems, adaptation, directional movement.",c.cobalt],["02","Exact","Restrained grids and explicit hierarchy.",c.steel],["03","Operational","Motion explains flow, state, and sequence.",c.amber]].forEach(([no,h,b,color],i)=>{const x=70+i*400;text(s,no,x,288,90,60,42,color,{mono:true,bold:true});text(s,h,x,352,280,40,26,c.ink,{bold:true});text(s,b,x,402,300,90,18,c.muted);}); footer(s,2);
}
{
  const s=deck.slides.add(); s.background.fill=c.white; heading(s,"Primary mark","The aquatic Axion signature.","Use the organic side-profile axolotl in navy and white by default. Keep its silhouette unchanged.");
  shape(s,64,260,532,330,c.navy); await mark(s,226,317,208,true); shape(s,628,260,532,330,c.ice); await mark(s,790,317,208,false);
  text(s,"DARK SURFACE",88,548,200,20,12,"#AFC2D4",{mono:true,bold:true}); text(s,"LIGHT SURFACE",652,548,200,20,12,c.muted,{mono:true,bold:true}); footer(s,3);
}
{
  const s=deck.slides.add(); s.background.fill=c.white; heading(s,"Color system","Navy leads. Cobalt moves. Amber focuses.","Turquoise is not part of the corporate palette. Every color has one engineering role.");
  [["AXION NAVY",c.navy,"Foundation"],["SIGNAL COBALT",c.cobalt,"Interaction"],["PROCESS STEEL",c.steel,"Infrastructure"],["REACTOR AMBER",c.amber,"Review"],["SAFETY CORAL",c.coral,"Critical"],["ICE",c.ice,"Canvas"]].forEach(([name,color,role],i)=>{const x=64+i*190;shape(s,x,268,166,182,color,18,color===c.ice?c.line:"none");const light=[c.navy,c.cobalt,c.steel,c.coral].includes(color);text(s,name,x+18,294,132,44,14,light?c.white:c.ink,{mono:true,bold:true});text(s,color,x+18,400,132,24,15,light?c.white:c.ink,{mono:true});text(s,role,x,470,166,30,16,c.muted,{align:"center"});}); footer(s,4);
}
{
  const s=deck.slides.add(); s.background.fill=c.navy; heading(s,"Typography","Readable first. Technical where it matters.","Manrope carries interface and brand voice. DM Mono identifies equipment, equations, units, versions, and coordinates.",true);
  text(s,"Manrope",72,292,520,80,52,c.white,{bold:true}); text(s,"Process design remains legible at operational density.",72,380,520,80,22,"#C8D7E5");
  text(s,"DM MONO",712,298,430,44,28,"#8FB0FF",{mono:true,bold:true}); text(s,"BR-201 · OTR 1.21 kg/h\nXᵥ + C₆H₁₂O₆ + O₂ → biomass + CO₂",712,374,470,92,19,c.white,{mono:true}); footer(s,5,true);
}
{
  const s=deck.slides.add(); s.background.fill=c.ice; heading(s,"Product interface","One visual language from model to decision.","Navy anchors navigation, cobalt identifies action, and neutral surfaces keep dense engineering information readable.");
  await image(s,`${root}/assets/product/axion-flowsheet-workspace.png`,64,244,1152,388,"cover"); footer(s,6);
}
{
  const s=deck.slides.add(); s.background.fill=c.white; heading(s,"Decision outputs","Evidence remains legible across disciplines.","Process architecture, readiness, TEA, and LCA use the same hierarchy and semantic color system.");
  await image(s,`${root}/assets/product/axion-plant-overview.png`,64,246,548,344,"cover"); await image(s,`${root}/assets/product/axion-tea-lca.png`,644,246,572,344,"cover");
  text(s,"PLANT OVERVIEW",72,608,220,22,12,c.muted,{mono:true,bold:true}); text(s,"TEA + LCA",652,608,220,22,12,c.muted,{mono:true,bold:true}); footer(s,7);
}
{
  const s=deck.slides.add(); s.background.fill=c.ice; heading(s,"Release standard","Every Axion surface must pass the same checks.","The identity is complete only when it remains readable, responsive, traceable, and consistent in the working product.");
  [["CONTRAST","WCAG AA for body text and controls"],["SEMANTICS","Color is paired with text, icon, or value"],["MOTION","Reduced-motion preserves meaning"],["LAYOUT","No overlap at desktop or mobile widths"],["PROVENANCE","Model, version, date, and source remain visible"],["EXPORT","PPT, SVG, reports, and screenshots use this system"]].forEach(([h,b],i)=>{const col=i%2,row=Math.floor(i/2),x=64+col*576,y=254+row*112;text(s,h,x,y,180,24,14,c.cobalt,{mono:true,bold:true});text(s,b,x+190,y-2,340,52,19,c.ink,{bold:true});});
  shape(s,64,594,1152,44,c.navy,14); text(s,"AXION PROCESS OS · BIOPROCESS ENGINEERING, CONNECTED.",86,606,1108,22,14,c.white,{mono:true,bold:true,align:"center"}); footer(s,8);
}

await fs.mkdir(renderDir,{recursive:true});
for(const [i,s] of deck.slides.items.entries()){
  const png=await deck.export({slide:s,format:"png",scale:1}); await fs.writeFile(`${renderDir}/slide-${i+1}.png`,new Uint8Array(await png.arrayBuffer()));
  const layout=await s.export({format:"layout"}); await fs.writeFile(`${renderDir}/slide-${i+1}.layout.json`,await layout.text());
}
const montage=await deck.export({format:"webp",montage:true,scale:1}); await fs.writeFile(`${renderDir}/montage.webp`,new Uint8Array(await montage.arrayBuffer()));
const pptx=await PresentationFile.exportPptx(deck); await pptx.save(output); console.log(output);
