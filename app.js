const bodyparser = require('body-parser')
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const methodoverride = require('method-override')
const port =3000;

mongoose.connect("mongodb://localhost/blogapp");
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended : true}));
app.use(express.static("public"));
app.use(methodoverride("_method"))


var blogSchema = new mongoose.Schema({

	title : String,
	image : String,
	description: String,
	created:{ type: Date , default: Date.now }
});

var Blog = mongoose.model("Blog", blogSchema);

/*Blog.create({
	title : "Test Blog",
	image : "https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350",
	description : "all campers stay overnight in cabins and eat all their meals in a cafeteria. At some camps, also known as day camps, the campers go home each night. Some other camps allow both day and overnight campers"
});
*/

app.get("/", (req,res) =>{

	Blog.find({}, function(err, blogs){
    
    if(err){

    	console.log(err);
    }
    else
    {

    	res.render("index",{ blogs: blogs});
    }

	});  

});

app.get("/blogs", (req,res) =>{

	Blog.find({}, function(err, blogs){
    
    if(err){

    	console.log(err);
    }
    else
    {

    	res.render("index",{ blogs: blogs});
    }

	});

});

app.get("/blogs/new", (req,res)=>{

	res.render("new.ejs");

});

app.post("/blogs",(req,res)=>{

	Blog.create(req.body.blog, (err,newBlog) =>{

		if(err){

    	res.render("new");
    }
    else
    {

    	res.redirect("/blogs");
    }

	})
});



app.get("/blogs/:id",(req,res)=>{

Blog.findById(req.params.id,(err, foundblog)=>{

	if(err){

		res.redirect("/blogs");
	}
	else{

		res.render("show",{blog : foundblog});
	}

})

});

app.get("/blogs/:id/edit", (req,res) =>{

Blog.findById(req.params.id,(err, foundblog)=>{

	if(err){

		res.redirect("/blogs");
	}
	else{

		res.render("edit",{ blog : foundblog});
	}

});
});


app.put("/blogs/:id" ,(req,res)=>{

Blog.findByIdAndUpdate(req.params.id, req.body.blog,(err, updateblog)=>{

	if(err){

		res.redirect("/blogs");
	}
	else{

		res.redirect("/blogs/"+ req.params.id);
	}



})
});

app.delete("/blogs/:id", (req,res) =>{

Blog.findByIdAndRemove(req.params.id, req.body.blog,(err)=>{

	if(err){

		res.redirect("/blogs");
	}
	else{

		res.redirect("/blogs");
	}

});
});


app.listen(port, () =>{

	console.log(`Server Running at Server ${port}`);

});