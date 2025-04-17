"use strict";(self.webpackChunkresgrid_docs=self.webpackChunkresgrid_docs||[]).push([[7493],{3905:(A,t,e)=>{e.d(t,{Zo:()=>s,kt:()=>p});var r=e(7294);function n(A,t,e){return t in A?Object.defineProperty(A,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):A[t]=e,A}function a(A,t){var e=Object.keys(A);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(A);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(A,t).enumerable}))),e.push.apply(e,r)}return e}function o(A){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?a(Object(e),!0).forEach((function(t){n(A,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(A,Object.getOwnPropertyDescriptors(e)):a(Object(e)).forEach((function(t){Object.defineProperty(A,t,Object.getOwnPropertyDescriptor(e,t))}))}return A}function i(A,t){if(null==A)return{};var e,r,n=function(A,t){if(null==A)return{};var e,r,n={},a=Object.keys(A);for(r=0;r<a.length;r++)e=a[r],t.indexOf(e)>=0||(n[e]=A[e]);return n}(A,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(A);for(r=0;r<a.length;r++)e=a[r],t.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(A,e)&&(n[e]=A[e])}return n}var l=r.createContext({}),d=function(A){var t=r.useContext(l),e=t;return A&&(e="function"==typeof A?A(t):o(o({},t),A)),e},s=function(A){var t=d(A.components);return r.createElement(l.Provider,{value:t},A.children)},c={inlineCode:"code",wrapper:function(A){var t=A.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(A,t){var e=A.components,n=A.mdxType,a=A.originalType,l=A.parentName,s=i(A,["components","mdxType","originalType","parentName"]),u=d(e),p=n,f=u["".concat(l,".").concat(p)]||u[p]||c[p]||a;return e?r.createElement(f,o(o({ref:t},s),{},{components:e})):r.createElement(f,o({ref:t},s))}));function p(A,t){var e=arguments,n=t&&t.mdxType;if("string"==typeof A||n){var a=e.length,o=new Array(a);o[0]=u;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=A,i.mdxType="string"==typeof A?A:n,o[1]=i;for(var d=2;d<a;d++)o[d]=e[d];return r.createElement.apply(null,o)}return r.createElement.apply(null,e)}u.displayName="MDXCreateElement"},8207:(A,t,e)=>{e.r(t),e.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>c,frontMatter:()=>a,metadata:()=>i,toc:()=>d});var r=e(7462),n=(e(7294),e(3905));const a={sidebar_position:21},o="Department Wide Types",i={unversionedId:"configuration/types",id:"configuration/types",title:"Department Wide Types",description:"Under the Department Menu in the Types menu option allows you set a number a department wide and module specific types or selection options.",source:"@site/docs/configuration/types.md",sourceDirName:"configuration",slug:"/configuration/types",permalink:"/configuration/types",draft:!1,editUrl:"https://github.com/Resgrid/docs/tree/develop/docs/configuration/types.md",tags:[],version:"current",sidebarPosition:21,frontMatter:{sidebar_position:21},sidebar:"tutorialSidebar",previous:{title:"Inventory Types",permalink:"/configuration/inventory-types"},next:{title:"Apps",permalink:"/category/apps"}},l={},d=[{value:"Call Types",id:"call-types",level:2},{value:"Call Priorities",id:"call-priorities",level:2},{value:"Unit Types",id:"unit-types",level:2},{value:"Certification Types",id:"certification-types",level:2},{value:"Document Categories",id:"document-categories",level:2}],s={toc:d};function c(A){let{components:t,...a}=A;return(0,n.kt)("wrapper",(0,r.Z)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"department-wide-types"},"Department Wide Types"),(0,n.kt)("p",null,"Under the Department Menu in the Types menu option allows you set a number a department wide and module specific types or selection options. "),(0,n.kt)("h2",{id:"call-types"},"Call Types"),(0,n.kt)("p",null,'By default there are no Call Types defined. A call type allows you organize calls into a category for example, "Structure Fire" or "Motor Vehicle Accident".'),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Call Types List",src:e(5667).Z,width:"1350",height:"326"})),(0,n.kt)("p",null,"Call Types are assignable on Call Creation and are also used in other systems to interact with calls. For example a Protocol or Call Template may utilize the Call Type to set data or perform an operation. "),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Call Types List",src:e(9028).Z,width:"595",height:"317"})),(0,n.kt)("p",null,"You cannot delete a Call Type once it's been used. If you wish to delete the Call Type you need to delete or update any systems where you used it, for example Protocols, Call Templates, Command Definitions, etc. Once those have been deleted or updated to another type you can then delete the Call Type. "),(0,n.kt)("admonition",{title:"Call Types in Calls",type:"tip"},(0,n.kt)("p",{parentName:"admonition"},"Call Type names are used in the Call when stored in the Database, thus changes or deletion of the call type won't impact previously entered calls.")),(0,n.kt)("h2",{id:"call-priorities"},"Call Priorities"),(0,n.kt)("p",null,"By default there are 4 Call Priorities defined in Resgrid; Low, Medium, High and Emergency all with default sounds and options."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Call Priorities List",src:e(3557).Z,width:"1344",height:"389"})),(0,n.kt)("p",null,"Once you create one new Call Priority the default ones will be deactivated and you will only have the option to select the Call Priorities you define. To return to the system defaults you will need to delete all your custom call Priorities. "),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"New Call Priority",src:e(9883).Z,width:"1354",height:"508"})),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Name"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"Priority Name"),(0,n.kt)("td",{parentName:"tr",align:null},"Name of the Call Priority that is selectable/shown")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"Priority Color"),(0,n.kt)("td",{parentName:"tr",align:null},"Color of the Priority also the Color of Text in Report")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"Sort Order"),(0,n.kt)("td",{parentName:"tr",align:null},"Lower means first on the lists, default (0) is order created")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"Is Default"),(0,n.kt)("td",{parentName:"tr",align:null},"Can only be ONE, is the default Priority for automation")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"Dispatch Personnel"),(0,n.kt)("td",{parentName:"tr",align:null},"Automation, does this priority dispatch Personnel directly")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"Dispatch Units"),(0,n.kt)("td",{parentName:"tr",align:null},"Automation, does this priority dispatch Units directly")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"Alert Sound"),(0,n.kt)("td",{parentName:"tr",align:null},"For Push Notifications and the UI, the sound for new calls")))),(0,n.kt)("admonition",{title:"Dispatch Personnel and Units",type:"tip"},(0,n.kt)("p",{parentName:"admonition"},'The Dispatch Personnel and Dispatch Units check boxes mean that Calls with this Priority can dispatch those entities (Persons or Units) when used in an automation. For example say you have a "Low" Call Priority and you don\'t want to wake up Personnel expect those currently staffing a Unit, you would only check the "Dispatch Units" checkbox and when any automation runs to automatically determine who to dispatch it won\'t automatically select personnel (that meet the automation criteria). For\nmanually entered in calls the "Dispatch Personnel" and "Dispatch Units" options don\'t come into play as the person entering the call can select whomever to dispatch.')),(0,n.kt)("h2",{id:"unit-types"},"Unit Types"),(0,n.kt)("p",null,"There are no default Unit Types in the Resgrid system. Unit Types allow you to assign some common aspect between your Units in Resgrid, for example their Map Icon and what Custom Statuses buttons they should be using."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Unit Types List",src:e(9930).Z,width:"1275",height:"393"})),(0,n.kt)("p",null,"When you create Custom Statuses (Actions) for Units, you need to assign that status to a Unit Type and then that Unit Type to a Unit (when you add or update a Unit in the Units Module) for the actions to be visible for a particular unit in the Resgrid Unit or Web Application."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Add Unit Type",src:e(1449).Z,width:"592",height:"385"})),(0,n.kt)("h2",{id:"certification-types"},"Certification Types"),(0,n.kt)("p",null,"Certifications allow you're users to add in Certifications and their information in their own profile. With the Certification Types you can add the certifications you want users to add and maintain in your Resgrid Department."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Certifications Types List",src:e(8662).Z,width:"1384",height:"343"})),(0,n.kt)("p",null,"Adding a new Certification Type requires you just specific the name of the Certification."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Add Certification Type",src:e(9528).Z,width:"1404",height:"242"})),(0,n.kt)("h2",{id:"document-categories"},"Document Categories"),(0,n.kt)("p",null,"Document Categories (Types) allow you to organize documents together. For example all of your Standard Operating Procedures and all of your Pre-Plan documents could be in different categories to make it easier to find the one your are looking for."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Document Types List",src:e(2085).Z,width:"1260",height:"157"})),(0,n.kt)("p",null,"Adding a new Document Category is as easy as adding the name of the Category you want to assign Documents to."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Add Document Type",src:e(7575).Z,width:"1282",height:"242"})),(0,n.kt)("p",null,"The Category text name is saved with the Document, changes to these Document Categories will only impact newly created documents."))}c.isMDXComponent=!0},3557:(A,t,e)=>{e.d(t,{Z:()=>r});const r=e.p+"assets/images/CallPriorities-d7c25b4ea1824dab4e5295fcbe84f851.png"},5667:(A,t,e)=>{e.d(t,{Z:()=>r});const r=e.p+"assets/images/CallTypes-024362359f8531935f266bb6a7a2e356.png"},8662:(A,t,e)=>{e.d(t,{Z:()=>r});const r=e.p+"assets/images/CertificationTypes-82d2cae5bf2cb8bb8cf80bf9c5ffdd1b.png"},2085:(A,t,e)=>{e.d(t,{Z:()=>r});const r="data:image/png;base64,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"},9883:(A,t,e)=>{e.d(t,{Z:()=>r});const r=e.p+"assets/images/NewCallPriority-e36d590603610dc92dc06d8e33017f52.png"},9028:(A,t,e)=>{e.d(t,{Z:()=>r});const r="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlMAAAE9CAYAAAAvV+dfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAACLGSURBVHhe7d0JdFXV9cfxHYIMAQIkkDCFeZ5BZgXnAVSwzuBQ7b+tFMWhiiAoiKIt/q1ahxbrv9aKQrXVOoOiqG1FUCCChDkJEAKEDIwZC8n/7f3uCy8BEpITQoLfz1p3nXvu9O57yVr5rX3Ouwkp8BEAAACcsIOZmfKPd96XKdMfFcIUAABAOb06dz5hCgAAoLy0QkWYAgAAcFDDawEAAFAOhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAHDaKigo8NaOVtK+siBM+bz1j7dl/B0TrQ3Qvi4AAKB60rC0bt062bp1q7fliMTERNmwYUOFBKoQ30XKfJXnXnhR1q5bb+t3T7xDunXtautq2vQZkp6eIVMnPyCtW8d4W0+ujIw9MveNN2TT5ng5dOiQ1KxZU5o3aya33HSjxMS08o46Pg1Ri7/4Us4/71y57pqrbVsgSM158XlrA7ZtS5InZj/p9Y52843j5KxhQ70eAAA4VXbv3i1JSUm23qRJE2nTpo2ta5DKyMiw9ZYtW0ozX2Zw4VyZmv/mW97aqbF//3557InfyLr1G6zfoH59qVGjhiRt3y61ateybRUpNLSGvYYutWr5r6/hrfg2AABwakVFRUlERIStp6WlWYUqPj6+MEhFR0c7BynlVJkKDw+3MHP1VT+Riy443/YdqzK1avVqmfe3t2Tfvn0WPHp07y4/u+2nkpCQIL9//kWJjIyQxx+dacdqMEpO3uFLii3k4akP2rbANYtXwdRTTz8rm30fTFRUU5k+bapdX23ZslXatvUn0K+XfCMfLVhgFSxVp04duerKMTJi+NnWL0tlKljgvO7duspdd95h2957/wNZ8MmnRe4/MzNL7ntgsq3PnPGwfPWvf9t5P7v1p/LBhx9Jqu8HrCFMK2kDzuxvx6kvvvxK3vvgQ8nJybH9Z581zO478B4BAEDpgitRARqkWrUqffTqRDhVpi65+EJrP16w0IbXjmXd+vXyx5de9gWKTAsrUU2bWrh6/oU/WDCq7QsJGpTS0tPtGjt37rLKkrba1yCi+/W44kFK9yf4PiA19vrrioSMQJBStWvXloMHM6V3r57SpUtnCyfz/vampOze7R1Rcc7yBR6lgVDfk1r27bfWNm/eTKJ9KTng1dfmWtu0SRPJy8uTV179a+E9Lfp8sbz5939IaGiofW7169e3APa3t/5u+wEAwIlp166dZYEALQZVVJBSTmGqU4eO0t53g9nZ2fLG/L95W4ta9Nnn1o4ZfYVVfaY/NNUXDOpZNUmDUocO7W3/hg0b5Yc1cZKfny9n9u9n7abNm+X7Vatsf+C4YDt27LTjVPGgFUyrPc898zuZMP52ufeuiRao1ObN8dZWpCaRkdKxQwdbj/3ef+9r4uKsHTa06FyqGN8P8rGZM2zRoKXv5bvvltu+L7/6ytqf/+xW+9ymTfFXtgKfBwAAODFamcrNzfV6/ilC27dv93runOdM3XDdtdYu+/a7Y1Z6Atvefuefhd+Q0yqRSk9Pl27dutm6hisNT+qiCy6wVocS49autfXAceWhlbAZjz4md959r72+BreTaeiQwdbGxn5v1bP4+ASrtg0bMsS2BwQHxC6d/QEvyxdMlVbjlA6D6j0HhgkDnx0AAChd8BCfDu0F5lClpKRUWKByDlM6L0rDg1ZVdOgseBgrmM5P0qG44CUyMlK6d+1i+7clJUnyjh0290mv2bhxY0lOTi4MY/369rE2mJ4fkJi4xVsrauOmzTbMmJqaJhddeIHMmjlDOnXs6O09OQYPGmjDklu2brWQmZuXZ0OM9eqFeUecOK3oFf/cAABA6fTbfMFBSof2dMgvOFDpMa6cw5S65qqrLDxoxSdxS9FnOQTClVZmzhkxvHDRxwdouNCvJOqwX5ov7OhM+1a+vmrVsoUFKZ07pRPUdfisOP/5LWz9g48+KjJvKysry9rU1FRrdUhtzBWX21cjD2YetG0ni87d6u8NVX62eLFtG3DmmdYG04pVwIaN/mpZWN261up7VvXCwo763AAAQOmaNm3qywr1jppsroFK80CDBg3sGFcVEqY01GjVR+n8qWBXXHaZBakvv/qXPPnU0/KHOS/J47+ZbW1A506drHqjQ1v6BlWb1q1lz569Fkh0//HcNHasXV+HBH89abJMmvyg3HPfJFtXYb4wovRRCfqaj856wpdE3VNoaYZ6Q3oaBjUsBn9LL2Drtm0yeepDtgQm3p937rm2b9Sll1qrE86fee55u/eHZ8yUd959z7YDAICShYSESNeuXY852VyfOdXJly/0GFcVEqbU5ZeNKqymBGvXrq1MGP9LXyqMsm/erf5hjT0KICbmyAM99VEJAYFhP51PFJhc3rtXL2uPRa//4ORJVnnSytSBgwet1b7S4cGBA/xVIX3tunXr2P2cbJ07dbRJ5apvn6OHKNWggQOk1hln2CMjwn3pWO8rMBSoFahxN1xvqVkrfnrvWm1rHfS5AQCA8quIIKXK9ZwplE4D3dSHZ9g3Boo/Df5Yz7UCAADVU4VVpuCnk+Z1GFOHGTVI6aMjKuvf6gAAgMpHmKpghw/n2/wsrUx169pF7r7rTm8PAAA4HTHMBwAA4IDKFAAAgAPCFAAAgAPCFAAAgAPCFAAAgAPCFAAAgAPCFAAAgAPCFAAAgAPCFAAAgAPCFAAAgAPCFAAAgAPCFAAAgAPCFAAAgAPCFAAAgAPCFAAAgAPCFAAAgIOQ5OTkAm8dAAAAZRRS4OOtAwAAoIwY5gMAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBAmAIAAHBwSsLUcy+8KOPvmChfL/nG+rquCwAAQHUTUuDjrZfJmrg4+fvb70hKym7r1wsLk/POPUcuv2yU9UuiYWrtuvVy843j5KxhQwuD1JwXn7c2YNu2JHli9pNer6jIyAh5/NGZXu/k0+A39415tn75qJFF3ue06TOsrcz7AQAAVUO5KlMaLF74wxwLUjGtWkn7du0kNy9P9u7b5x1RMcLqhUnvXj1tCQ8Pt20xMa2s371bN+ufCh8v/ET279/v9QAAwI9ZuSpTDzw4zcLEuBuulxHDz7Zthw4dksP5+VK7Vi3ZuGmzvDF/vqSmpkm+b1udOnVk7PXXyeBBA+3YE61MBSt+jr7efZMmW4ibOeNhiY6KkszMLJk05UE7/n9/+xu574HJFvS0irViZazUqFHD7ve6a662Y/QaL//5LxK3dq2tN2zY0Hf9sdKzRw/bHyxQmWrZsoUkJ++QXj17yB2/Gm/7ilemFnzyqXz22eeSmZVl/ejoKLn7zjslIqJxYbVt5CUX+z6nTRKfkCg1a9aUSy++yI5d+OkiuxcNjfdMnCj1fIFSvfWPt+U/Xy+RPN/71c/zqivHFH72AADg1ClzZUrDgAap+vXrFfljroFAg5Rq2aKF5OTkyrnnjJCRl15iAeCvc1+XtPR0218R9PUGDhxg60uXLrN22bffWnjTylUghCQkJlpg6dmju/UXf/GlxH6/ytZfefWvsmr1aunWtYv8ZMxou88/zPmThbLjOWf4cAtnP6yJk3Xr13tbi9LPISIiwq6poUsreHP+9LK3108Dl75Oly6dLTx9+PECC1Ldu3WVunXrSlLSdl//Uzv2w48+tvtuFh1toVTD1Ly/vWmhFQAAnFrlnoBeu3Ztb+1oGmRmPzHLKkBjrrhcOnXqaCEnq4SQUh4XXXiBtd/7ApFaGfu9tYMHDbI2YNqUyTJh/O0yZvQV1v9u+XJrv1/lP+/2X/xcLrn4Ihk18lK7zyVLl9r2Y9Egec1VV9n66/PmW1vc+eedK9MenGzX1GurzKxMawM0cD00dYrce9dEiYpqats0KOl9aghTycnJ1n7r3a/uP2fEcPnpzTda/5sS7hMAAFSOcoep/Pzjjw7q5PSpD0+XCRPvtiG8DRs2ensqlg7tNW/eTHbu3CWJiVusCqVzq/r17eMd4ReoUoXVrWttTk6O7EpJseCk7rz7XrvPt9/5p/X37Nlj7bFkZWfb9bWilJ6eYVWj4nRITocg9Zp67WOp36C+VddUk8hIa3X+mQoNDbU2ICPDfz+zn/qdXfP3z79o/X0VPEcNAACUXZnDVOvWMVZV0cCxfMVKb+sROnSlQ2V79+6TOyeMl1kzZ9i8pZNl+FlnWTv/zbcsHA04s7/1gwWG7dLS0qzVYTIdMtM5VDqkpvcYvOi39Uqj88X0/EWffS65ubneVv8woi6NGzeWhx6cIo9Mf8jbU34610pNeeD+Ivd5609vse0AAODUKVdlasSI4dbqnKPHfzNbnnnueavEaEVGBSo+mzbH2zygLVu3Wv9k0HlbGu62JSVZX4fBinv8t7N9Ae8lWfT5YusPHOCfa9W3T2/Jzs628Be3dp18/c1S33t6TcLC/JWskmhVTOeE6QT4gwePDOHpJHx1MDNT4hMS5NXX5lrfxSDvfv/0f6/YRHpd5s6bLwf4RiEAAKdcucLU1T+50iozDRo0kKTt2wuH8VrHxNiQmlZ2tGqzYOEnsnPnTrlp3A22/2QInoiuFTANOcEaNgyXDu3byZq4tdbXewsMA/7s1p/a/CadGK+VrU98wa/43KaS6DfqAo9sCDjPF7D09fbu3WvP4erWpYuFNhf6TKvrr71GsrKy5J/vvW9Lamqq1K5TxzsCAACcKuV+aGdVot8U/GbpMpvwruEo4EQeuQAAAOCi3BPQq4KPFyyUJ5962oKUzn3iuUsAAKCyVeswtTk+3r7B17RJE3ngvl8XfjsOAACgspwWw3wAAACnSrWuTAEAAJxqZa5MpexOlcOHD3s9AACA6k0flh3t/TeS8ihzmNqxc5e0aN7M6wEAAFRvrtmGYT4AAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHhCkAAAAHIQU+3voJSdmdKocPH/Z6AAAA1VtoaKhERzX1emVX5jAFAACAIxjmAwAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcBBS4OOtn7Bp02dIenqG1KhRQ5575ndSs2ZNb4/IY0/8RpKTd9j61MkPSOvWMbZekcbfMdHaOS8+by0AAMCp4lSZys/Pl2Xffuf1RNLS0wuDFAAAwI9BuStT+fkFkpWZKd26dZXxv/yFbf/wo4/lw48XSMuWLSxUBSpTGzdtljfmz5fU1DQLYHXq1JGx118ngwcNtPO00tS+XTuJjIyQFStjreI1YvjZct01V9v+4opXpnbu3CVzXn5ZUlJ2W79hw4YyccKvpFWrlrImLk7mvjFf9u3bZ9dt17aN3P6Ln0t4eLhs25YkT8x+UkZecrHvHjdJfEKiHXNm/37yP7fdatcCAAAoSbkrUzVqhEiHDu1l3br1cujQIdu2IjbWglRDX1AJ1rJFC8nJyZVzzxkhIy+9RPLy8uSvc1+3SlZAQmKihZmePbpbf/EXX0rs96tsvST62k/+7mkLUhrIevfqKbVq1bIglbJ7t/xhzp/kwIED0qVLZ2kWHW2v8dQzz3pn+y345FPJzMyyc9V3y1ec0GsDAACUO0wdPHBQzuzfX3J9weiHNXEWXLRC1K9PHzmcn+8d5VevXpjMfmKWVZrGXHG5dOrU0SpUWb4AE2zalMkyYfztMmb0Fdb/bvlya0uyYuVKyc7OtiD1wP2/tvMfe2S67fvP10vsdbQCdu9dE2X6Q1OlefNmsnt3qqxbv96OUbV94euhqVPs3EC1LCur6L0BAAAcS7nDlIaovr7gpMNiGnqWLl1m24cMGSxpaWm2HqBDbVMfni4TJt5tQ3QbNmz09hSloUuF1a1rbU5OjrUl2e7N0Wrbto21wTQ0qY4dOlirGjdqZG1Gxh5rVf0G9Qsn0df1XhsAAOBEOE1A1/CjFSGdb/T96tW23iQy0tvrp8NnOtS2d+8+uXPCeJk1c4Yddyx6rAqEMZ1bVRodulNbtmy1NlhUVFNrN8fHW6v27N1rbUREY2sBAABcOIUp1adPbzl4MNM/xNevr7e1KB1qU5s2x8vCTxfJlq1HBx/1+G9n+4LXS7Lo88XWHzhggLUlCVTHdM7Vk089beffde99tu+iC863ffqNw2eee14enfWE3aeGrG5du9oxAAAALpzD1LAhQ7y1ousBWr26fNRICzULFn7iCzM75aZxN3h7j2jYMFw6tG8na+LWWl/P6de3j62XRK8/Yfwv7Rt8GqhW/7BGGjf2D+XpN/YenDxJIiMibGhxV0qKvcb9995j+wEAAFyV69EIFY2HcAIAgOrKuTIFAADwY0aYAgAAcFAlhvkAAACqq0oPUykpabJsWawkJCR5WwC/9u1jZPDgfhId3cTbAgBA1VepYUqD1Pz578vQoWdK27atJCQkxNuDHzv9NdyyZbt8880KGTt2NIEKAFBtVGqYev/9RdKsWbQFKeBYNFDt2pUio0df5G0BAKBqq9QJ6Dq016ZNS68HHE1/PxgCBgBUJ5X+bT6G9lASfj8AANUNj0YAAABwQJgCAABwcNqFqekzZ9jy2uuveVvKZ2XsSudrAACA01+VCVMaXAJBKLB8vHCBt/fE6DWGDB4ij86YKbfcdIu3tWLotXfs2On1AAAA/KpUZerK0WMsCAWW9RvWy9O/f8bbe2KaRUd7axUrLT3dWwMAADiiSg/z/frue63VIbcArVYFV68CdH1zfLy8+/57tq5VJF2Cjw0OZnqd4sN42g9+rQA9d+/evTLn5TmF10bp9LNaumyZ1ztCt+k+AABOB1V+zlTXLl1lTdwaW9egs3TZ0sLKlQ7pBQKR9jt26FBY3WrRorkt438xvvB4VdahQxU4N3AtvS5Kpz+fBZ8skHhfyA3Qdd2m+wAAOB1UqwnoGqqC/wiPunSkVaNKEhx8NJih8oy85FLfZ95F5r05X3al7LJF13Wb7gMA4HRQrcKUzlvSypQOEQUWVdKwW/Cxei4qjz6A89qrr5XoqGh5/Y3XbdF13cbDOQEAp4sqH6Y0APXs0dPWm0RGHjVJvaRhNw1QwceXNrTEJPOKV7NmTblp3DipeUZNW2zdtw0AgNNFlQ5TGoZ0HlT/fv2tr6FKJ5iXRbPoI0EruDKl3/oLHiLU+Vg6ybwku1KYeF4eYWH15J6J99ii6wAAnE5CCny89ZPu2WdfkXHjrvR6RelE8uLzn7SSpPOigmnoCQ5UjRo1KvzWn15DA1cgfOlk8+AApVWqXSkphdcMfk29js6p0pCl5+vr6BytwPOqgq+lE9GZhH7yzJv3rtxzz8+8HgAAVVuVCVNAAGEKAFCdVKsJ6AAAAFUNYQoAAMBBpYepShxVRDXE7wcAoLqp1DDVvn2MbN2a7PWAo+nvh/6eAABQXVRqmBo8uJ8sWbJcEhOTqECgCP190N8L/f3Q3xMAAKqLSv02n0pJSZNly2IlISHJ2wL4aUVKg1R0dBNvCwAAVV+lhykAAIDTCd/mAwAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcECYAgAAcBCSnJxc4K0DAACgjEIKfLx1AAAAlBHDfAAAAA4IUwAAAA4IUwAAAA4IUwAAAA4IUwAAAA4IUwAAAA4IUwAAAA4IUwAAAA4IUwAAAA4IUwAAAA4IUwAAAA4IUwAAAA4IUwAAAA4IUwAAAA5CCny8dQAAUAr9oznq1bWyMS3LvwHVWucmYfLxrd0lxOuXB5UpAADKwB+kMn1r1CKqvwL7WerP1AVhCgCAMjhSkXKpZaBq8P8MXauMhCkAAMqMIHX6cP9ZEqYAAAAcEKYAAAAcEKYAAAAcEKYAAAAcEKYAAAAcEKYAAAAcEKYAAAAcEKYAAAAcEKYAAJVuwLSFsi55v9dDdfLHMR3kvZu7ez2Rpb/qI1POaeX1fpz4R8cAgAqXnXdYZv1zjXy1brfk/PewhNYIkVYRYTL9qp7Sp01jC1NzJwyTbi3DvTOqjw5PLffWyuYXA5vJ+EHNpFHdmtY/6PuMXo9Nlf/993brV6bhbcNl0vBW0qVpXanp+9kcyi+QHfvz5MFPt8jSbQe8o45Nw1SL8NoyZq7//9lpmHp3bbr89qui70O3N613htcrak1KVuH5VUX8/QO8tbKjMgUAqFDpB3Jl5OwvZHtGlsy9Y6gsf/xSWTT1fLl+aBvp3qqhd9SPyzntGsqkES3l/XUZcvZLq+XiV9bIc0t2SHxGtndE5bm+VxP589WdJO9wvtz45gYLh9p+mbCv1CBVFkP+uMqurYuGp0837SnsV7Ug5YrKFACgQt3/RqxkHMyVV24f4m05WvHK1NcbUmXWu2skdX+u1KpZQ64eFCP3XdbN9qlpb66SL9amSN6hfKlzRqjceHZb+dWFnWyfnjvznR98r5ln++4d1dXOP1k0DJSVDoNd2T3SAsbx/PXazjKwZX2p7Xv/ub73OW+V7zP5IskqQe0j6sglf4nzjhTp3aye/POmbjJpQaK8E5cuD50XI+P6NLVz9+Uclj8u2ykvf7fLO7qof/2ytyRk5Mit/9jobTna8e5FnWhlKpgOC+7w/Wx/9V689e8e1kJuH9RMuj+70voBK+7sKx/4AmeO7zWHtg63+xzVpbFVzzalZcv0z7bJt9uPBL6yvO/SUJkCAFQZ/16/W24Y1sbrlW5bWqZMmhcrU0b3sCrWwinnWUB68gP/H+v5S7bKD0l75fNpF9j+9+8fIZf0bm77Auf+dmxf2/fK7YPl2QXrZXFciu2vKr7ZdsCGvHSo73i+2bZfrnhtrYW1Z77eIbf0j5LmDWpZWOoYWdcCVMB1vZpI8v4823fHkOZyfe+mcvu7m+1cDRNaBbuoYyPv6COu6BohLcNryRvf7/a2HNvx7qWi/H7JDsn2BSYNVQE394uSur5Q9NK3/jDUMzpMwmrVkHNf/sGqebmHC+TJkW1tnyrL+z7ZCFMAgAqjk8oP5xdITMSRP/ylmfufLdK/bYSc0y3K+uF1z5DJo7vLByuTrX84P9/agIj6taV9VH1b//uybRas9HzVuXm4nNkuwgJdVfJV4j6ZvyrV/tgvGd9HJo9odVQ4mbNsl8Rn5Ni6BoPQkBAZ2rqBLNq814KTBqiAga3qy4rkg7Z+cafG8t7adPn3Fv+Efq3OpGX+14YWi+vhCyhKr1mS491LRfo26YBc2rmx1xO5oEMjGw7ceSDP+ocLCuSRz7ZZX5eHF22VmIa1C99XWd73yUaYAgCcUjv3ZEu7qKLha3DHJjaJXcOZzrWKiQyTCx7/3Ib7ktKzvKNEEndnWujSYcPA8p8NqTZcWNU85AsDI/8SZ8FKKyoLb+th85eUBqtnLmsvsRP7yQ9397c2mAYPDVBKK1RaqdKhNRVd/wwZ26epDVMFluj6tSQyzD/RvaxKu5eKolW1DpF1Citug3zvb8HGPbauMrIOFQYrtXpXphzIPVz4OVT0+3ZBmAIAVBidA6Xf3Nu5t+ImVp8RWkNevG2gvHnX2da/5tl/yytfJti6GjusjQ3xBS8v3Fb++S8nk1Z7Hvxki/R/IVbWp2bLrWdG2/anL2sn3aPqys1vbZBev18p/Z6Pte0Br8XuLhzq0wrV5vRsC2UBWj3Soa7gJTA/KVhcij+IllS9Ke1eKopWx+LTc+SWflE2ZKfDfn9ZUbbh2RN93ycbYQoAUKF6xTSSvy/d5vVKp1UprTAFW7Y5zUJZ8KMTtDr1+PV95LHresu7y/2ToZs3ritx24+EiuokdsdBaew9JqFd4zryRcI+G+ZSxcOOVmU2pmVbkNLKjM7BCtiTfUi6NvUP35Xmg/UZsjfnkIzr29TbcrTS7qUiLdy4Rwb43s/ZbcOt+hZM55gFD4XqXKgGtUPlu+3+4c2yvO+TjTAFAKhQ+i28Vdv2yD2vrZDEVP8fvv3Z/5VVW48M4QS7dnBr+S4h3Z5JpfTY2e+vlVF9j0xODrZhxwGbV6VuPruthalXv0qQ/x72z63auPOAbAsaCqwKtPKiQ1IdIupY/8IOjWR0t4jCStE+X8AJzGfSY/TbfzpnKNgyX9jQ50O18+3XIbKAD30BaVibBjJxqP/z0gCirxU8YT2Yzt06r31D+fNVnWRAS/+QmbbX9PQPOZ7IvVQUnYge5QtNfXz3GvyeAh65sLW9H13u9L2/pH25hRW5sr7vk4lHIwAAKtyuvdky9c1Vsn7HfnucQeChnW/fO9z2F380wsotGTYfKvBoBA1SD/2kp+177V+J8qfFm+3hn6pNk3ry4m0DpFmjutbXcx99e40910o1Da8ts67rYxPRTwYdSiorfUDmTf2aSv1aodbP+m++/GfLPnl0cZLNC9K5U5PPiZGGdUILH0VwYcdG9iyqQMjQsPDVL3vJut3ZRz2n6b7hLeXGPlF2vtJrTvt0a5GhwGBjukXaZPio+mfY5HJ9aOfa3Vnyk9fXlXovFfFohGCvXtNZ2jaubd/aCwg8SkKrd+f7gufxHo1Q1vddEp1zVV6EKQAAyqA8YQrHp8+9Why/Vx75/MjQ8Ik8l6uiuYQphvkAAMApoQ/d1HljgWdLVVeEKQAAUKm08qSVoKt6NJFZi/3PkqrOGOYDAKAMGOY7PTHMBwAAcIoQpgAAABwQpgAAABwQpgAAABwQpgAAKDO+u3X6cP9ZEqYAACiDzk0C/w+OQFX9+X+GR36m5UOYAgCgDD6+tbvvj6/+/7cQ/wZUYyH2s9SfqQueMwUAAOCAyhQAAIADwhQAAIADwhQAAIADwhQAAIADwhQAAIADwhQAAIADwhQAAIADwhQAAIADwhQAAIADwhQAAIADwhQAAIADwhQAAEA55ebmEqYAAADKa/Xq1RJS4OP1AQAAcAK0IqVB6sMPP5SQGTNmEKYAAADKQGtReXl5kpOTIyETJkyw4hQFKgAAgJKFhIQULqGhoVKzZk35f29WtcFPT5jKAAAAAElFTkSuQmCC"},9528:(A,t,e)=>{e.d(t,{Z:()=>r});const r=e.p+"assets/images/NewCertificationType-7f21d6e8d5ea062256bbe94f3ee0a39b.png"},7575:(A,t,e)=>{e.d(t,{Z:()=>r});const r=e.p+"assets/images/NewDocumentCategory-494177541f2d2589baa77698b4503602.png"},1449:(A,t,e)=>{e.d(t,{Z:()=>r});const r=e.p+"assets/images/NewUnitType-f8b26e36cc822402a68cc20890de8fb0.png"},9930:(A,t,e)=>{e.d(t,{Z:()=>r});const r=e.p+"assets/images/UnitTypes-5fa8d593e641b6c18d47d3b310cb64ce.png"}}]);