/**
* Example on getting a tag from a VM with a specific category and returns an array of tag names.
* Jacob Styrup Bang - jacob@styrupnet.dk
* vHost = VAPI:VAPIEndpoint
* VM = VC:VirtualMachine
* TagCategoryName = string:Category Name
*/

var client = vHost.client();  
var tagCat = new com_vmware_cis_tagging_category(client);
var returnArray = new Array();
var obj = new com_vmware_vapi_std_dynamic__ID(client);  
obj.id = VM.id;
obj.type = "VirtualMachine";  
var tagsvc = new com_vmware_cis_tagging_tag__association(client); 
var tagList = tagsvc.list_attached_tags(obj);
var taggingClient = new com_vmware_cis_tagging_tag(client);
for each (var tag in tagList){
	var currentTag = taggingClient.get(tag);
	var tagCategory = tagCat.get(currentTag.category_id);
	if(tagCategory.name == TagCategoryName) {
		//System.log("*****Tag ID found " + currentTag.id + " for tag " + currentTag.name + " dsc: " + currentTag.description + " Cat: " + currentTag.category_id + " " + tagCategory.name);
		System.log(TagCategoryName + " = " + currentTag.name);
		returnArray.push(currentTag.name);
	}
}
return returnArray;