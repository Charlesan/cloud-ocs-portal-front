$("body").on("click", 'ol.breadcrumb.breadcrumb-resource-infrastructure li a', function(){
	var cmd = $(this).attr("cmd");
	if (cmd == "cloudResourceHome") {
		$(this).parent().next().nextAll().remove();
		$(this).parent().next().addClass("active");
		$(this).parent().next().text($(this).parent().next().text());
		listInfrastructureZones();
	}
	if (cmd == "listInfrastructureZones") {
		$(this).parent().nextAll().remove();
		$(this).parent().addClass("active");
		$(this).parent().text($(this).text());
		listInfrastructureZones();
	}
	if (cmd == "listPods") {
		$(this).parent().nextAll().remove();
		var zoneName = $(this).parent().text();
		var zoneId = $(this).attr("zoneId");
		$(this).parent().remove();
		listPods(zoneId, zoneName);
	}
	if (cmd == "listClusters") {
		$(this).parent().nextAll().remove();
		var zoneId = $(this).attr("zoneId");
		var podId = $(this).attr("podId");
		var podName = $(this).text();
		$(this).parent().remove();
		listClusters(zoneId, podId, podName);
	}
});

//对sidebar的点击行为进行处理
$( ".sidebar-cloud-resource-infrastructure" ).click(function() {
  //删除首页欢迎消息
  $("div.content div.alert").remove();

  //插入面包屑导航栏
  $(".breadcrumb.breadcrumb-resource-infrastructure").remove();
  $("div.content").prepend($("<ol class=\"breadcrumb breadcrumb-resource-infrastructure\"></ol>"));

  var preActiveItem = $("ul.nav li.active");
  preActiveItem.removeClass("active");
  var curActiveItem = $(this).parentsUntil("ul.nav");
  curActiveItem.addClass("active");
  var firstLevelTitle = curActiveItem.children("a").text().trim();
  var secondLevelTitle = $(this).text();
  $("ol.breadcrumb.breadcrumb-resource-infrastructure").empty();
  $("ol.breadcrumb.breadcrumb-resource-infrastructure").append("<li><a href=\"#\" cmd=\"cloudResourceHome\"><span class=\"glyphicon glyphicon-home\"></span>&nbsp;&nbsp;" + firstLevelTitle + "</a></li>");
  $("ol.breadcrumb.breadcrumb-resource-infrastructure").append("<li class=\"active\">" + secondLevelTitle + "</li>");

  listInfrastructureZones();

});

//处理获取系统基础设施Zone列表的请求
function listInfrastructureZones() {
	$("#content-area").empty();

	var zoneListTable = $("<table class=\"table table-bordered text-center\">"
		+ "<caption>系统区域（机房）列表</caption>"
		+ "<thead><tr><th>序号</th><th>区域（机房）名称</th><th>网络类型</th><th>状态</th><th>查看</th></tr></thead>"
		+ "<tbody></tbody>"
		+ "</table>");	
	$("#content-area").append(zoneListTable);
	//请求获取区域列表数据
	$(".table tbody").append("<tr><td>1</td><td>zoneName</td><td>高级网络</td>"
		+ "<td><span class=\"label label-success\">成功标签</span></td>"
		+ "<td><button type=\"button\" class=\"btn btn-primary btn-xs\" onclick=\"listPods('zoneId', 'zoneName');\">查看</button></td></tr>");
}

//处理获取系统基础设施Pod列表的请求
function listPods(zoneId, zoneName) {
	var secondLevelTitle = $("ol.breadcrumb.breadcrumb-resource-infrastructure li.active").text();
	$("ol.breadcrumb.breadcrumb-resource-infrastructure li.active").text("");
	$("ol.breadcrumb.breadcrumb-resource-infrastructure li.active").append("<a href=\"#\" cmd=\"listInfrastructureZones\">" + secondLevelTitle + "</a>")
	$("ol.breadcrumb.breadcrumb-resource-infrastructure li.active").removeClass("active");
	$("ol.breadcrumb.breadcrumb-resource-infrastructure").append("<li class=\"active\">" + zoneName + "</li>");
	$("#content-area").empty();

	var podListTable = $("<table class=\"table table-bordered text-center\">"
		+ "<caption>区域" + zoneName + "提供点列表</caption>"
		+ "<thead><tr><th>序号</th><th>提供点名称</th><th>状态</th><th>查看</th></tr></thead>"
		+ "<tbody></tbody>"
		+ "</table>");
	$("#content-area").append(podListTable);
	//请求获取数据
	$(".table tbody").append("<tr><td>1</td><td>podName</td>"
		+ "<td><span class=\"label label-success\">成功标签</span></td>"
		+ "<td><button type=\"button\" class=\"btn btn-primary btn-xs\" onclick=\"listClusters('zoneId', 'podId', 'podName');\">查看</button></td></tr>");
}

function listClusters(zoneId, podId, podName) {
	var thirdLevelTitle = $("ol.breadcrumb.breadcrumb-resource-infrastructure li.active").text();
	$("ol.breadcrumb.breadcrumb-resource-infrastructure li.active").text("");
	$("ol.breadcrumb.breadcrumb-resource-infrastructure li.active").append("<a href=\"#\" cmd=\"listPods\" zoneId=\"" + zoneId + "\">" + thirdLevelTitle + "</a>")
	$("ol.breadcrumb.breadcrumb-resource-infrastructure li.active").removeClass("active");
	$("ol.breadcrumb.breadcrumb-resource-infrastructure").append("<li class=\"active\">" + podName + "</li>");
	$("#content-area").empty();

	var clusterListTable = $("<table class=\"table table-bordered text-center\">"
		+ "<caption>提供点" + podName + "集群列表</caption>"
		+ "<thead><tr><th>序号</th><th>集群名称</th><th>状态</th><th>查看</th></tr></thead>"
		+ "<tbody></tbody>"
		+ "</table>");
	$("#content-area").append(clusterListTable);
	//请求获取数据
	$(".table tbody").append("<tr><td>1</td><td>ClusterName</td>"
		+ "<td><span class=\"label label-success\">成功标签</span></td>"
		+ "<td><button type=\"button\" class=\"btn btn-primary btn-xs\" onclick=\"listHosts('zoneId', 'podId', 'clusterId', 'clusterName');\">查看</button></td></tr>");
}

function test() {
	console.log("hihih");
}

function listHosts(zoneId, podId, clusterId, clusterName) {
	var fourthLevelTitle = $("ol.breadcrumb.breadcrumb-resource-infrastructure li.active").text();
	$("ol.breadcrumb.breadcrumb-resource-infrastructure li.active").text("");
	$("ol.breadcrumb.breadcrumb-resource-infrastructure li.active").append("<a href=\"#\"cmd=\"listClusters\" zoneId=\"" + zoneId + "\" podId=\"" + podId + "\">" + fourthLevelTitle + "</a>");
	$("ol.breadcrumb.breadcrumb-resource-infrastructure li.active").removeClass("active");
	$("ol.breadcrumb.breadcrumb-resource-infrastructure").append("<li class=\"active\">" + clusterName + "</li>");
	$("#content-area").empty();

	$("#content-area").append("<button type=\"button\" class=\"btn btn-success btn-sm pull-right\"><span class=\"glyphicon glyphicon-plus\"></span>  点击添加物理主机</button>");

	var hostListTable = $("<table class=\"table table-bordered text-center\">"
		+ "<caption>集群" + clusterName + "主机列表</caption>"
		+ "<thead><tr><th>序号</th><th>IP地址</th><th>主机名称</th>"
		+ "<th>Hypervisor</th><th>创建时间</th><th>状态</th>"
		+ "<th>操作</th></tr></thead>"
		+ "<tbody></tbody>"
		+ "</table>");
	$("#content-area").append(hostListTable);
}

function listCapacity() {
	$("#content-area").empty();
	//listInfrastructureZones();
}