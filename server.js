const cheerio = require("cheerio");
const http = require("http");
const url = "http://duanziwang.com";
let arr = [];
//爬虫工作
function reptileWork(url,response){
	//response  服务器响应对象；
	http.get(url,function(res){
		//阶段性捕获页面dom结构；
		res.setEncoding("utf-8");//防止中文乱码；
		let html = "";
		res.on("data",function(data){
			html+=data;
		})
		res.on("end",function(){
//			html;整个爬虫页面的dom；
			let $ = cheerio.load(html);;
			//内容
			$(".post").each(function(index,item){
				arr.push({
					title:$(this).find(".post-title").text(),
				    content:$(this).find("p").text()
				});
			});
			response.end(JSON.stringify(arr));
		})
	})
}
http.createServer((req,response)=>{
	response.writeHead(200,{
		"content-type":"text/html;charset=utf-8",
		"Access-Control-Allow-Origin":"*"
	})
	if(req.method.toLowerCase() == "get"){
		if(req.url == "/chick"){
			reptileWork(url,response)
		}
	}
}).listen(8080,()=>{
	console.log("server run");
})
