(function clientSketchRedesign(){
  document.addEventListener('DOMContentLoaded',()=>{
    'use strict';
    if(window.__tselaSketchRevision)return;
    window.__tselaSketchRevision=true;
    const h=s=>esc(s);
    const link=(url,label,cls='')=>a(url,label,cls);
    const cash=n=>n===null||n===undefined||n===''?'On enquiry':formatZar(n);
    const photo=(x,kind='Crops')=>x&&/^https:\/\//i.test(x)?h(x):(kind==='Livestock'?'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&q=82':'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=82');
    const marketNames=['Crops','Livestock'];
    const programs=[
      {icon:'📈',name:'Investor Development Course',desc:'Impact investment fundamentals, due diligence and investment-ready ventures.',url:'/course/investor-development',badge:'Development course'},
      {icon:'🤝',name:'Sales Broker Programme',desc:'Learn the fundamentals of sourcing, sales introductions and commodity market coordination.',url:'/enrollment?pathway=Sales%20Broker',badge:'Register interest'},
      {icon:'🌍',name:'Become an Impact Investor',desc:'Explore our impact investment approach and request an introduction to the network.',url:'/impact-investor',badge:'Investor pathway'}
    ];
    const section=(eyebrow,name,description,body)=>`<section class="sk-section"><div class="container"><div class="sk-sectionhead"><span class="sk-eyebrow">${h(eyebrow)}</span><h2>${h(name)}</h2>${description?`<p>${h(description)}</p>`:''}</div>${body}</div></section>`;
    const crumb=(name,heading,description,body)=>`<section class="sk-subhero"><div class="container"><span class="sk-eyebrow">${h(name)} · TSELA YAGWE NETWORK</span><h1>${h(heading)}</h1><p>${h(description)}</p></div></section><section class="sk-content"><div class="container">${body}</div></section>`;
    const action=(name,url)=>link(url,name,'sk-button');
    const outline=(name,url)=>link(url,name,'sk-button sk-outline');
    const courseCard=p=>`<article class="sk-course"><div class="sk-programicon">${p.icon}</div><span class="sk-kicker">${h(p.badge)}</span><h3>${h(p.name)}</h3><p>${h(p.desc)}</p><div class="sk-fee">Programme fees: <strong>Confirm on registration</strong></div>${action('Register / Learn more →',p.url)}</article>`;
    const categoryCard=(kind)=>`<a data-link href="/market/${kind.toLowerCase()}" class="sk-category"><div class="sk-category-image"><img loading="lazy" src="${photo(null,kind)}" alt="${kind==='Crops'?'Green cultivated agricultural land':'Livestock grazing on a farm'}"></div><div class="sk-category-info"><span class="sk-kicker">FARM PRODUCE</span><h3>${kind==='Crops'?'Crop commodities':'Livestock commodities'}</h3><p>${kind==='Crops'?'Discover harvested produce, planting projects and commodity offers.':'Browse animal products, livestock lots and verified seller enquiries.'}</p><span class="sk-arrow">Explore ${kind} ↗</span></div></a>`;
    const listingsOf=kind=>(state.listings||[]).filter(x=>x.status==='approved'&&x.category===kind);
    function homeView(){
      return `<section class="sk-hero"><div class="container sk-hero-layout"><div><span class="sk-eyebrow">ABOUT US · AGRICULTURE · IMPACT INVESTMENT</span><h1>Growing opportunity. <em>Creating lasting impact.</em></h1><p>Tsela Yagwe Network connects investor development, commodity management and agricultural markets. We help transform learning opportunities and challenged business cases into impact investment cases.</p><div class="sk-hero-actions">${action('Become an Impact Investor →','/impact-investor')}${outline('Read about us','/about')}</div></div><div class="sk-hero-art"><img src="${photo(null,'Crops')}" alt="Agricultural landscape and cultivated farmland"><span>Learn · Produce · Trade · Grow</span></div></div></section>
      <section class="sk-intro"><div class="container sk-intro-grid"><div><span class="sk-eyebrow">OUR PURPOSE</span><h2>From ideas to investable possibilities.</h2></div><div><p>We connect people, training and agricultural enterprise opportunities through a single marketplace ecosystem.</p>${link('/about','Read more about our network →','sk-textlink')}</div></div></section>
      ${section('01 / INVESTOR & FRANCHISE DEVELOPMENT','Discover development opportunities','Choose a programme to register your interest or request verified course information.',`<div class="sk-course-grid">${programs.map(courseCard).join('')}</div><p class="sk-disclaimer">Admissions, course fees and investor eligibility are confirmed by the programme team. No financial returns are promised.</p>`)}
      ${section('02 / MARKET CATEGORIES','Explore the agricultural marketplace','The marketplace is organised around the two core commodity categories in your brief.',`<div class="sk-category-grid">${marketNames.map(categoryCard).join('')}</div><div class="sk-centeraction">${outline('View all market categories →','/market-categories')}</div>`)}
      <section class="sk-cta"><div class="container"><span class="sk-eyebrow">YOUR NETWORK ACCOUNT</span><h2>Manage your wallet, profile and commodity portfolio in one place.</h2><p>Secure access for registered members and commodity managers.</p>${action(state.user?'Open my dashboard →':'Create my account →',state.user?'/dashboard':'/register')}</div></section>`;
    }
    function developmentView(){
      const existing=(state.courses||coursesSeed).filter(c=>c.slug!=='investor-development');
      return crumb('Learning & Development','Investor & Franchise Development','Register for a programme, develop market skills and explore our investor network.',
        `<div class="sk-course-grid">${programs.map(courseCard).join('')}</div>
        <div class="sk-content-block"><h2>More learning pathways</h2><div class="sk-course-grid">${existing.map(c=>courseCard({icon:c.icon||'🎓',name:c.title,desc:c.short_description||'Contact the training team for details.',url:'/enrollment?course='+encodeURIComponent(c.slug),badge:'Development course'})).join('')}</div></div>
        <div class="sk-info">Course pricing and registration terms are confirmed directly by the team. Published figures will only appear after verification.</div>`);
    }
    function courseDetailView(slug){
      const c=(state.courses||coursesSeed).find(x=>x.slug===slug);
      if(!c)return crumb('Development Courses','Programme unavailable','The requested course is not listed in the current programme catalogue.',`<div class="sk-panel">${action('View development courses →','/development')}</div>`);
      return crumb('Development Courses',c.title,c.short_description||'Development course and applicant orientation',`<div class="sk-two-col"><article class="sk-panel"><span class="sk-kicker">PROGRAMME OVERVIEW</span><h2>Learn and develop your skills</h2><p>${h(c.short_description||'Programme details can be requested from the course coordinator.')}</p><p>Duration: ${h(c.duration||'Confirm on enquiry')}</p><p>Tuition and admission fees: ${c.fee==null?'Confirm on registration':cash(c.fee)}</p>${action('Register for this course →','/enrollment?course='+encodeURIComponent(c.slug))}</article><article class="sk-panel"><h3>Registration process</h3><ol><li>Submit the enrolment application</li><li>Receive an eligibility and course availability response</li><li>Review the formal prospectus and verified fee schedule</li></ol><p class="sk-disclaimer">Registration is subject to review and does not guarantee placement or financing.</p></article></div>`);
    }
    function investorView(){
      return crumb('Investment pathway','Become an Impact Investor','Connect with a network focused on responsible enterprise and agricultural development.',
        `<div class="sk-two-col"><article class="sk-panel"><span class="sk-kicker">YOUR NEXT STEP</span><h2>Register your interest</h2><p>Learn about the network, due diligence, project screening and requirements before deciding whether to participate.</p><div class="sk-actions">${action('Create member account →','/register')}${outline('Contact the investor team','/contact')}</div></article><article class="sk-panel"><h3>What to expect</h3><ul class="sk-checks"><li>Introduction to the impact investment approach</li><li>Relevant development courses and investment-readiness support</li><li>Formal documentation and eligibility checks</li><li>Independent review of project risks and commercial terms</li></ul><p class="sk-disclaimer">Registration is an expression of interest, not an investment offer. Capital is not collected on this site, and returns are not guaranteed.</p></article></div>`);
    }
    function categoriesView(){
      return crumb('Agricultural markets','Market Categories','Select Crops or Livestock to browse real, administrator-approved listings.',
        `<div class="sk-category-grid">${marketNames.map(categoryCard).join('')}</div><div class="sk-mini-cta"><strong>Interested in listing agricultural produce?</strong>${action('Register to Sell →',state.user?'/dashboard':'/register')}</div><div class="sk-info">All listed products are subject to approval, supplier verification and independent confirmation of quantity, quality and price.</div>`);
    }
    const extraFields=(kind)=>{
      const crops=['Seed variety','Fertiliser type','Expected harvest date'];
      const stock=['Animal type','Breed','Health certificate','Feed type','Life cycle / maturity'];
      return (kind==='Livestock'?stock:crops).map(label=>`<div class="sk-spec"><span>${h(label)}</span><strong>Confirm with seller</strong></div>`).join('');
    };
    const parseSpecs=desc=>{
      const data={};
      String(desc||'').split(/\r?\n/).forEach(line=>{
        const m=line.match(/^(Seed variety|Fertiliser type|Expected harvest date|Animal type|Breed|Health certificate|Feed type|Life cycle \/ maturity)\s*:\s*(.{1,180})$/i);
        if(m)data[m[1].toLowerCase()]=m[2];
      });
      return data;
    };
    const specsFor=l=>{
      const labels=l.category==='Livestock'?['Animal type','Breed','Health certificate','Feed type','Life cycle / maturity']:['Seed variety','Fertiliser type','Expected harvest date'];
      const meta=parseSpecs(l.description);
      return labels.map(label=>`<div class="sk-spec"><span>${h(label)}</span><strong>${h(meta[label.toLowerCase()]||'Confirm with seller')}</strong></div>`).join('');
    };
    const productCard=l=>`<article class="sk-product"><img src="${photo(l.image_url,l.category)}" loading="lazy" alt="${h(l.title)}"><div class="sk-productbody"><span class="sk-kicker">${h(l.category)}</span><h3>${h(l.title)}</h3><div class="sk-productfacts"><span>📍 ${h(l.location||'Location on enquiry')}</span><span>⚖ ${h(l.quantity_text||'Quantity on enquiry')}</span></div><div class="sk-productprice">${cash(l.price_zar)}</div><div class="sk-productmetrics"><span>Term <b>On enquiry</b></span><span>Return % <b>Not published</b></span></div><div class="sk-actions">${action('View details →','/product/'+encodeURIComponent(l.id))}${outline('Bid / Buy','/product/'+encodeURIComponent(l.id)+'#bid-request')}</div></div></article>`;
    function marketView(kind){
      const lots=listingsOf(kind);
      const verified=(state.commodities||[]).filter(x=>x.category===kind&&x.price_zar!=null&&x.verified_at);
      return crumb('Farm Produce',kind==='Crops'?'Crop Market':'Livestock Market',
        kind==='Crops'?'Explore crop products, harvest details, available quantities and approved market listings.':'Explore livestock offers, health documentation and approved commodity listings.',
        `<div class="sk-market-intro"><div><span class="sk-kicker">${kind.toUpperCase()} / MARKETPLACE</span><h2>Products and opportunities</h2><p>Price and product information appears only when supplied and approved.</p></div>${action('Register to '+(state.user?'Sell':'Trade')+' →',state.user?'/dashboard':'/register')}</div>
        ${lots.length?`<div class="sk-product-grid">${lots.map(productCard).join('')}</div>`:`<div class="sk-empty"><span>🌱</span><h3>No approved ${kind.toLowerCase()} listings yet</h3><p>Supplier products will appear here once the team approves them. You can already register to submit a commodity lot.</p>${action('Register to list a product →',state.user?'/dashboard':'/register')}</div>`}
        ${verified.length?`<div class="sk-content-block"><h3>Verified commodity price indicators</h3><div class="sk-tablewrap"><table class="sk-table"><thead><tr><th>Commodity</th><th>Price / unit</th><th>Verification date</th></tr></thead><tbody>${verified.map(c=>`<tr><td>${h(c.name)}</td><td>${cash(c.price_zar)} / ${h(c.unit||'unit')}</td><td>${new Date(c.verified_at).toLocaleDateString('en-ZA')}</td></tr>`).join('')}</tbody></table></div></div>`:''}
        <div class="sk-info">Product terms, expected profit, returns and investment durations are not displayed until documented and independently verified. No buying or capital settlement is processed by this website.</div>`);
    }
    function productView(id){
      const l=(state.listings||[]).find(x=>String(x.id)===id&&x.status==='approved');
      if(!l)return crumb('Marketplace','Product unavailable','The requested product has not been published or may have been removed.',`<div class="sk-empty">${action('Return to market categories','/market-categories')}</div>`);
      const mine=state.user?.id===l.owner_id;
      const bidForm=state.user&&!mine?`<form id="skBidForm" class="sk-form"><input type="hidden" name="listing_id" value="${h(l.id)}"><label>Bid price in rand<input type="number" name="bid_price_zar" required min="1" step="0.01" placeholder="Your offer in ZAR"></label><label>Message to seller<textarea name="message" maxlength="1000" rows="3" placeholder="Quantity, collection date or questions"></textarea></label><button type="submit" class="sk-button">Submit bid request →</button><div class="sk-form-msg" aria-live="polite"></div><p class="sk-disclaimer">A bid request does not transfer funds, reserve stock or finalise a purchase.</p></form>`:mine?'<p class="sk-disclaimer">You cannot bid on your own listing.</p>':`<p>Sign in or register to submit a bid request.</p>${action('Register to Buy / Bid →','/register')}`;
      return crumb(l.category,h(l.title),l.location||'Approved market listing',
        `<div class="sk-detail-grid"><div><div class="sk-product-image"><img src="${photo(l.image_url,l.category)}" alt="${h(l.title)}"></div><div class="sk-panel"><h2>Description</h2><p class="sk-preline">${h(l.description||'Contact the seller for further information.')}</p></div></div><div class="sk-panel"><span class="sk-kicker">APPROVED COMMODITY</span><h2>${h(l.title)}</h2><div class="sk-strongprice">${cash(l.price_zar)}</div><div class="sk-spec"><span>Location</span><strong>${h(l.location||'Confirm with seller')}</strong></div><div class="sk-spec"><span>Quantity / volume</span><strong>${h(l.quantity_text||'Confirm with seller')}</strong></div><div class="sk-spec"><span>Price term / return %</span><strong>Not published</strong></div>${specsFor(l)}<div id="bid-request" class="sk-bidbox"><h3>Register to Buy / Bid</h3>${bidForm}</div></div></div>`);
    }
    const foodNames=[['traditional-foods','Traditional Foods'],['fast-foods','Fast Foods'],['liquor-restaurants','Liquor Restaurants'],['cakes-bakes-treats','Cakes, Bakes & Treats'],['commercial-restaurants','Commercial Restaurants'],['fast-food-franchises','Fast Food Franchises']];
    function foodView(){return crumb('Market Categories','Food Market','Browse business categories and enquire about participation.',`<div class="sk-food-grid">${foodNames.map(([slug,name])=>`<a class="sk-foodcard" href="/food/${slug}" data-link><span>🍽</span><strong>${name}</strong><small>View category →</small></a>`).join('')}</div>`)}
    const navMenu=[['/','Home'],['/about','About Us'],['/development','Development Courses'],['/market-categories','Market Categories'],['/contact','Contact']];
    header=function(){
      const path=state.route;
      return `<header class="site-header"><div class="topbar">INVESTOR DEVELOPMENT • AGRICULTURAL MARKETS • COMMODITY MANAGEMENT</div><div class="container nav"><a href="/" data-link class="brand"><span class="brand-mark">TY</span><span><strong>TSELA YAGWE</strong><small>NETWORK</small></span></a><nav class="navlinks">${navMenu.map(([url,label])=>link(url,label,path===url?'active':'')).join('')}</nav><div class="nav-cta">${link(state.user?'/dashboard':'/login',state.user?'My Dashboard':'Member Login','btn btn-outline btn-sm')}${link(state.user?'/dashboard':'/register',state.user?'My Account':'Register','btn btn-primary btn-sm')}</div><button class="hamburger" id="menuButton" aria-label="Open navigation" aria-expanded="false">☰</button></div><div id="mobileDrawer" class="mobile-drawer hide">${navMenu.map(([url,label])=>link(url,label)).join('')}${link('/farm-produce','Farm Produce')}${link('/food-market','Food Market')}${link(state.user?'/dashboard':'/login',state.user?'My Dashboard':'Login / Register')}${link('/admin','Admin')}</div></header>`;
    };
    const oldDashboard=dashboard;
    const tabs=[['wallet','💼 Wallet'],['profile','👤 Commodity Manager Profile'],['portfolio','🌾 Portfolio'],['orders','📋 Orders, Sell & Bid'],['history','↔ Transactions'],['indicators','📊 Market Indicators']];
    const metric=(label,value,note)=>`<div class="sk-wallet-metric"><span>${h(label)}</span><strong>${value}</strong><small>${h(note)}</small></div>`;
    const fmtDate=date=>date?new Date(date).toLocaleDateString('en-ZA'):'—';
    const rowActions=()=>`<div class="sk-actions">${['Deposit','Transfer','Withdraw'].map(x=>`<button type="button" class="sk-button ${x==='Deposit'?'':'sk-outline'}" data-capital="${x.toLowerCase()}">${x}</button>`).join('')}</div>`;
    function profilePanel(){
      const p=state.profile||{},name=p.full_name||state.user.email.split('@')[0]||'Member';
      return `<div class="sk-panel"><span class="sk-eyebrow">COMMODITY MANAGER PROFILE</span><div class="sk-profilebanner"><div class="sk-avatar">${h(name.trim().charAt(0).toUpperCase()||'M')}</div><div><h2>${h(name)}</h2><p>${h(state.user.email||'')}</p><span class="sk-kicker">${p.role==='admin'?'Administrator':'Registered member'}</span></div></div><div class="sk-profile-facts"><span>Age <strong>${p.age_years?h(p.age_years):'Not provided'}</strong></span><span>Location <strong>${h(p.location||'Not provided')}</strong></span><span>Qualification level <strong>${h(p.qualifications||'Not provided')}</strong></span></div><h3>Update profile</h3><form id="skProfileForm" class="sk-form sk-form-grid"><label>Full name<input name="full_name" required value="${h(p.full_name||'')}"></label><label>Age (years)<input name="age_years" type="number" min="18" max="120" value="${p.age_years??''}"></label><label>Location<input name="location" value="${h(p.location||'')}"></label><label>Qualification level<input name="qualifications" value="${h(p.qualifications||'')}"></label><label>Phone number<input name="phone" type="tel" value="${h(p.phone||'')}"></label><label>Years of experience<input name="experience_years" type="number" min="0" max="80" value="${p.experience_years??''}"></label><div class="sk-form-full"><button class="sk-button" type="submit">Save profile →</button><div class="sk-form-msg" aria-live="polite"></div></div></form><p class="sk-disclaimer">Profile details are only available in your authenticated account.</p></div>`;
    }
    const splitAsset=(description)=>{
      const lines=String(description||'').split(/\r?\n/);
      const get=key=>{const x=lines.find(v=>v.toLowerCase().startsWith(key.toLowerCase()+': '));return x?x.slice(key.length+2):'—'};
      return {quantity:get('Quantity'),location:get('Location'),notes:lines.filter(v=>!/^Quantity: |^Location: /i.test(v)).join(' ')};
    };
    function portfolioPanel(){
      const assets=state.clientAssets||[];
      return `<div class="sk-panel"><div class="sk-titleline"><div><span class="sk-eyebrow">02 / PORTFOLIO</span><h2>My Commodity Portfolio</h2><p>Track the assets you declare and request market services.</p></div>${outline('Explore market','/market-categories')}</div><div class="sk-tablewrap"><table class="sk-table"><thead><tr><th>Commodity</th><th>Volume / Quantity</th><th>Location</th><th>Declared value</th><th>Profit %</th><th>Actions</th></tr></thead><tbody>${assets.length?assets.map(x=>{const m=splitAsset(x.description);return `<tr><td><strong>${h(x.asset_name)}</strong></td><td>${h(m.quantity)}</td><td>${h(m.location)}</td><td>${cash(x.estimated_value_zar)}</td><td>Not verified</td><td><div class="sk-smallactions"><button data-tab="orders">Order</button><button data-capital="transfer">Transfer</button><button data-tab="orders">Sell</button></div></td></tr>`}).join(''):'<tr><td colspan="6" class="sk-tableempty">No portfolio records yet. Add your first asset below.</td></tr>'}</tbody></table></div><div class="sk-two-col sk-after"><div><h3>Add commodity / asset</h3><form id="skAssetForm" class="sk-form"><label>Commodity name<input name="asset_name" maxlength="120" required placeholder="e.g. Maize or cattle"></label><label>Volume / quantity<input name="quantity" maxlength="65" placeholder="e.g. 250 bags"></label><label>Location<input name="location" maxlength="90" placeholder="Town, district, province"></label><label>Declared asset value (ZAR)<input name="estimated_value_zar" type="number" min="0" step=".01" required></label><label>Description<textarea name="notes" rows="2" maxlength="180" placeholder="Additional details"></textarea></label><button type="submit" class="sk-button">Add to Portfolio →</button><div class="sk-form-msg" aria-live="polite"></div></form></div><div class="sk-info"><strong>About portfolio values</strong><p>Portfolio values are provided by the member. They are not independently valued assets, wallet credit, profit forecasts or guaranteed returns.</p></div></div></div>`;
    }
    function walletPanel(){
      const wallet=state.wallet||null,entries=state.transactions||[],assets=state.clientAssets||[];
      const deposited=entries.filter(t=>t.entry_type==='deposit'&&t.status==='settled').reduce((v,t)=>v+Number(t.amount_zar||0),0);
      const balance=wallet?cash(wallet.balance_zar):'—';
      const available=wallet?cash(wallet.available_zar):'—';
      const assetTotal=assets.reduce((v,t)=>v+Number(t.estimated_value_zar||0),0);
      return `<div class="sk-panel"><span class="sk-eyebrow">01 / WALLET</span><h2>My Wallet</h2><p>Your authenticated account figures and separately declared portfolio values.</p><div class="sk-wallet-grid">${metric('Deposited amount',cash(deposited),'Settled deposits recorded in the ledger')}${metric('Current balance',balance,'Ledger-backed wallet amount')}${metric('Referral bonus','—','No verified bonus ledger available')}${metric('Asset value',cash(assetTotal),'Member-declared portfolio value')}${metric('Credit value','—','Not enabled')}${metric('Available balance',available,'Subject to reconciliation')}</div><div class="sk-actions sk-after">${rowActions()}</div><p class="sk-disclaimer">Real-money deposits, transfers and withdrawals are disabled until licensed payment processing, regulatory review and full audit controls are ready.</p></div><div class="sk-two-col sk-after"><div class="sk-panel"><h3>Commodity portfolio</h3><p>${assets.length} recorded assets · ${cash(assetTotal)} declared value</p><button data-tab="portfolio" class="sk-button">View Portfolio →</button></div><div class="sk-panel"><h3>Marketplace orders</h3><p>Browse active commodities, submit a seller listing or make a non-binding bid request.</p><button data-tab="orders" class="sk-button sk-outline">Open Order Book →</button></div></div>`;
    }
    function historyPanel(){
      const entries=state.transactions||[];
      return `<div class="sk-panel"><span class="sk-eyebrow">TRANSACTION RECORDS</span><h2>Transaction History</h2><div class="sk-tablewrap"><table class="sk-table"><thead><tr><th>Type</th><th>Amount (ZAR)</th><th>Status</th><th>Date</th></tr></thead><tbody>${entries.length?entries.map(x=>`<tr><td>${h(x.entry_type)}</td><td>${cash(x.amount_zar)}</td><td>${h(x.status)}</td><td>${fmtDate(x.created_at)}</td></tr>`).join(''):'<tr><td colspan="4" class="sk-tableempty">No verified transactions have been recorded.</td></tr>'}</tbody></table></div></div>`;
    }
    function indicatorPanel(){
      const cs=state.commodities||[];
      return `<div class="sk-panel"><span class="sk-eyebrow">MARKET PRICING</span><h2>Commodity Price Indicators</h2><div class="sk-tablewrap"><table class="sk-table"><thead><tr><th>Commodity</th><th>Category</th><th>Verified price</th><th>Last update</th></tr></thead><tbody>${cs.length?cs.map(x=>`<tr><td>${h(x.name)}</td><td>${h(x.category)}</td><td>${x.price_zar!=null&&x.verified_at?cash(x.price_zar)+' / '+h(x.unit||'unit'):'Awaiting verification'}</td><td>${fmtDate(x.verified_at)}</td></tr>`).join(''):'<tr><td colspan="4" class="sk-tableempty">No verified price indicators yet.</td></tr>'}</tbody></table></div><p class="sk-disclaimer">Price indicators are historical, not live bids or guaranteed offer prices.</p></div>`;
    }
    function ordersPanel(){
      const my=state.myListings||[],approved=state.listings||[],bids=state.memberBids||[];
      return `<div class="sk-panel"><span class="sk-eyebrow">ORDER · TRANSFER · SELL</span><h2>Commodity Order Desk</h2><div class="sk-actions">${outline('Browse available lots','/market-categories')}<button data-capital="transfer" class="sk-button sk-outline">Transfer (not live)</button></div><div class="sk-content-block"><h3>Approved lots — Bid / Buy enquiries</h3><div class="sk-tablewrap"><table class="sk-table"><thead><tr><th>Commodity</th><th>Description</th><th>Sale Value</th><th>Bid Price</th></tr></thead><tbody>${approved.length?approved.map(x=>`<tr><td>${h(x.title)}</td><td>${h(x.location||'')}; ${h(x.quantity_text||'Quantity on enquiry')}</td><td>${cash(x.price_zar)}</td><td>${outline('Bid / Buy →','/product/'+encodeURIComponent(x.id)+'#bid-request')}</td></tr>`).join(''):'<tr><td colspan="4" class="sk-tableempty">No administrator-approved lots available yet.</td></tr>'}</tbody></table></div></div>
      <div class="sk-two-col sk-after"><div><h3>Sell a commodity</h3><p>Supply the crop or livestock details to submit a listing for approval.</p><form id="skListingForm" class="sk-form"><label>Commodity / lot name<input name="title" maxlength="140" required></label><label>Market category<select name="category" id="skLotCategory"><option>Crops</option><option>Livestock</option><option>Agroprocessing</option></select></label><label>Location<input name="location" required maxlength="140"></label><label>Volume / quantity<input name="quantity_text" maxlength="120" required></label><label>Sale value in rand (optional)<input name="price_zar" type="number" step=".01" min="0"></label><label>Description<textarea name="description" rows="3" required maxlength="1200"></textarea></label><div data-lot-kind="Crops"><label>Seed variety<input name="seed_variety" maxlength="120"></label><label>Fertiliser type<input name="fertiliser_type" maxlength="120"></label><label>Expected harvest date<input name="harvest_date" type="date"></label></div><div data-lot-kind="Livestock" hidden><label>Animal / breed<input name="breed" maxlength="120"></label><label>Health certificate details<input name="health_certificate" maxlength="120"></label><label>Feed type<input name="feed_type" maxlength="120"></label><label>Life cycle / maturity<input name="life_cycle" maxlength="120"></label></div><button type="submit" class="sk-button">Submit for approval →</button><div class="sk-form-msg" aria-live="polite"></div></form></div><div><h3>My submitted products</h3>${my.length?my.map(x=>`<div class="sk-record"><strong>${h(x.title)}</strong><span>${h(x.status)} · ${h(x.category)}</span></div>`).join(''):'<p class="sk-info">You have not submitted a commodity lot yet.</p>'}<h3 class="sk-after">My bid requests</h3>${bids.length?bids.filter(x=>x.bidder_id===state.user.id).map(x=>`<div class="sk-record"><strong>${cash(x.bid_price_zar)} · ${h(x.status)}</strong><span>${fmtDate(x.created_at)}</span></div>`).join(''):'<p class="sk-info">No bid requests placed yet.</p>'}</div></div></div>`;
    }
    dashboard=function(){
      if(!CONNECTED||!state.user)return oldDashboard();
      const p=state.profile||{},name=p.full_name||state.user.email?.split('@')[0]||'Member';
      let tab=state.dashTab||'wallet';
      if(!tabs.some(x=>x[0]===tab))tab='wallet';
      const panels={wallet:walletPanel,profile:profilePanel,portfolio:portfolioPanel,orders:ordersPanel,history:historyPanel,indicators:indicatorPanel};
      return `<section class="sk-subhero sk-memberhero"><div class="container"><span class="sk-eyebrow">SECURE MEMBER WORKSPACE</span><h1>Welcome, ${h(name)}.</h1><p>Manage your commodity account, portfolio and trade requests.</p></div></section><section class="sk-content"><div class="container"><div class="sk-dashboard"><aside class="sk-sidebar"><h3>My account</h3>${tabs.map(([id,label])=>`<button data-tab="${id}" class="${tab===id?'active':''}">${label}</button>`).join('')}${p.role==='admin'?link('/admin','Admin console','sk-adminlink'):''}<button id="logout" class="sk-logout">Sign out ↗</button></aside><div class="sk-dash-main">${panels[tab]()}</div></div></div></section>`;
    };
    const previousLoad=loadProtected;
    loadProtected=async function(){
      await previousLoad();
      if(!CONNECTED||!state.user)return;
      const uid=encodeURIComponent(state.user.id);
      const [assets,bids]=await Promise.allSettled([
        rest('member_assets',{query:'select=*&owner_id=eq.'+uid+'&order=created_at.desc'}),
        rest('commodity_bids',{query:'select=*&order=created_at.desc&limit=100'})
      ]);
      if(assets.status==='fulfilled')state.clientAssets=assets.value||[];
      if(bids.status==='fulfilled')state.memberBids=bids.value||[];
    };
    const previousRender=render;
    render=function(){
      const path=state.route||'/';
      let view=null;
      if(path==='/')view=homeView();
      else if(['/development','/marketplace/investment-franchise-courses'].includes(path))view=developmentView();
      else if(path==='/impact-investor')view=investorView();
      else if(['/market-categories','/markets','/marketplace/market-categories','/farm-produce','/marketplace/farm-produce'].includes(path))view=categoriesView();
      else if(['/market/crops','/marketplace/farm-produce/crops'].includes(path))view=marketView('Crops');
      else if(['/market/livestock','/marketplace/farm-produce/livestock'].includes(path))view=marketView('Livestock');
      else if(['/food-market','/marketplace/food-market'].includes(path))view=foodView();
      else if(path.startsWith('/food/')||path.startsWith('/marketplace/food-market/')){
        const id=path.split('/').pop(),category=foodNames.find(x=>x[0]===id);
        if(category)view=crumb('Food Market',category[1],'This category is open for business registrations and enquiries.',`<div class="sk-panel"><p>Contact the network to submit your business information for this category.</p>${action('Enquire →','/contact')}</div>`);
      }
      else if(path.startsWith('/product/'))view=productView(decodeURIComponent(path.slice('/product/'.length)));
      else if(path.startsWith('/course/')||path.startsWith('/marketplace/course/'))view=courseDetailView(decodeURIComponent(path.split('/').pop()));
      if(view!==null){
        app.innerHTML=header()+`<div class="sk-app"><main id="main">${view}</main></div>`+footer();
        document.title=(path==='/'?'About Us & Marketplace':path.split('/').filter(Boolean).pop().replace(/-/g,' '))+' | Tsela Yagwe Network';
      }else previousRender();
      if(path==='/enrollment'){
        const v=new URLSearchParams(location.search).get('pathway');
        if(v){const el=document.getElementById('pathway');if(el&&[...el.options].some(o=>o.value===v))el.value=v;}
      }
      if(location.hash&&location.hash.length<100){
        try{document.querySelector(location.hash)?.scrollIntoView({behavior:'smooth'})}catch(_){}
      }
    };
    const alertForm=(f,message,failed=false)=>{const el=f.querySelector('.sk-form-msg');if(el){el.textContent=message;el.classList.toggle('error',failed)}else toast(message);};
    document.addEventListener('change',e=>{
      if(e.target.id!=='skLotCategory')return;
      const value=e.target.value,f=e.target.form;
      f?.querySelectorAll('[data-lot-kind]').forEach(el=>{el.hidden=el.dataset.lotKind!==value;});
    });
    document.addEventListener('submit',async e=>{
      const f=e.target;
      if(!['skProfileForm','skAssetForm','skListingForm','skBidForm'].includes(f.id))return;
      e.preventDefault();e.stopImmediatePropagation();
      const submit=f.querySelector('button[type="submit"]');if(submit)submit.disabled=true;
      try{
        if(!CONNECTED||!state.user)throw Error('Please sign in before submitting.');
        const data=Object.fromEntries(new FormData(f));
        if(f.id==='skProfileForm'){
          const allowed=['full_name','age_years','location','qualifications','phone','experience_years'];
          const payload=Object.fromEntries(allowed.map(k=>[k,data[k]||null]));
          if(payload.age_years!==null)payload.age_years=Number(payload.age_years);
          if(payload.experience_years!==null)payload.experience_years=Number(payload.experience_years);
          if(!payload.full_name)throw Error('Full name is required.');
          await rest('profiles',{method:'PATCH',query:'id=eq.'+encodeURIComponent(state.user.id),data:payload});
          await fetchProfile();
        }else if(f.id==='skAssetForm'){
          const d=['Quantity: '+(data.quantity||'—'),'Location: '+(data.location||'—'),data.notes||''].filter(Boolean).join('\n');
          if(d.length>400)throw Error('Reduce the description to 400 characters.');
          await rest('member_assets',{method:'POST',data:{owner_id:state.user.id,asset_name:data.asset_name.trim(),estimated_value_zar:Number(data.estimated_value_zar),description:d}});
          await loadProtected();
        }else if(f.id==='skListingForm'){
          const pairs=data.category==='Crops'?[
            ['Seed variety',data.seed_variety],['Fertiliser type',data.fertiliser_type],['Expected harvest date',data.harvest_date]
          ]:data.category==='Livestock'?[
            ['Breed',data.breed],['Health certificate',data.health_certificate],['Feed type',data.feed_type],['Life cycle / maturity',data.life_cycle]
          ]:[];
          const description=[data.description.trim(),...pairs.filter(x=>x[1]).map(([label,value])=>label+': '+value)].join('\n');
          if(description.length>3000)throw Error('Please shorten the commodity description.');
          await rest('listings',{method:'POST',data:{owner_id:state.user.id,title:data.title.trim(),category:data.category,location:data.location.trim(),quantity_text:data.quantity_text.trim(),price_zar:data.price_zar?Number(data.price_zar):null,description,status:'pending'}});
          await loadProtected();
        }else if(f.id==='skBidForm'){
          const amount=Number(data.bid_price_zar);
          if(!Number.isFinite(amount)||amount<=0)throw Error('Enter a valid positive bid price.');
          await rest('commodity_bids',{method:'POST',data:{listing_id:data.listing_id,bidder_id:state.user.id,bid_price_zar:amount,message:(data.message||'').trim()}});
          await loadProtected();
        }
        alertForm(f,f.id==='skListingForm'?'Listing submitted for administrator approval.':f.id==='skBidForm'?'Your bid request was recorded. No payment has been made.':'Saved successfully.');
        if(f.id!=='skProfileForm')f.reset();
      }catch(ex){alertForm(f,ex.message||'Could not save. Please try again.',true)}
      finally{if(submit)submit.disabled=false;}
    },true);
    if(state.user){loadProtected().then(render).catch(e=>{console.warn('Dashboard data not yet available:',e);render()})}
    else render();
  });
})();
