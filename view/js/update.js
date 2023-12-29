let fname = document.getElementById("name");
let femail = document.getElementById("email");
let fmobile = document.getElementById("mobile");
let fwebsite = document.getElementById("website");
let fimage = document.getElementById("image");
let faddress = document.getElementById("address");


let params=new Proxy(new URLSearchParams(window.location.search),{
  get:(searchParams,prop)=>searchParams.get(prop)
});
console.log(`params=`,params.id);


function submitHandler(event){
  event.preventDefault();
  let data ={
    name:fname.value,
    email:femail.value,
    mobile:fmobile.value,
    website:fwebsite.value,
    image:fimage.value,
    address:faddress.value
  }
  console.log('updated data',data)

  fetch(`/api/contact/update/${params.id}`,{
    method:"PATCH",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  }).then(res=>res.json())
  .then(res=>{
    alert(res.msg);
    window.location.href="/"
  }).catch(err=>console.log(err.message))
}


const print =(data)=>{
  fname.value=data.name;
  femail.value=data.email;
  fmobile.value=data.mobile;
  fwebsite.value=data.website;
  fimage.value=data.image;
  faddress.value=data.address
}
function read(){
  fetch(`/api/contact/single/${params.id}`)
    .then(res=>res.json())
    .then(res=>{
      console.log(`res=`,res)
      print(res.contact)
    }).catch(err=>console.log(err.message))
}

read()