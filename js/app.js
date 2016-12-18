var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'Partials/partial-home.html',
            css:'css/partial-home.css'
        })
        
        // nested form for adding new contact
        .state('home.add',{
            url:'^/addcontact',
            templateUrl:'Partials/partial-add.html',
            css:'css/partial-home.css'
        })
        .state('edit',{
            url:'/editcontact',
            templateUrl:'Partials/partial-edit.html',
            css:'css/partial-edit.css'
        });
        
        // // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        // .state('about', {
        //     url: '/about',
        //     views: {
        //         '': { templateUrl: 'Partials/partial-about.html' },
        //         'columnOne@about': { template: 'Look I am a column!' },
        //         'columnTwo@about': { 
        //             templateUrl: 'Partials/table-data.html',
        //             controller: 'scotchController'
        //         }
        //     }
            
        // });
        
});

var friendList = new Array; // List of all the friends 
var global_Personid=0; // Initial count of the menmbers 

routerApp.factory("displayAll",function(){ 
        return friendList;  
});

routerApp.factory("passData",function(){ //factory for passing data b/w displayFriends and editContact controllers
    var savedData={}
    function set(data){
        savedData = data;
    }
    function get(){
        return savedData;
    }
    return{
        set:set,
        get:get
    }
});

routerApp.controller("editContact",function($scope,$location,passData){
    $scope.frData=passData.get().friend;
    $scope.index=passData.get().idx;
    console.log("Recieved data to edit");
    $scope.nameForHeading=$scope.frData.name.toUpperCase(); // Changing all the character of name to uppercase.
    $scope.upContact={
        name:"",
        address:"",
        dob:""
    };

    $scope.updateValues=function(){
        if($scope.upContact.name != "")
        { 
            $scope.frData.name=$scope.upContact.name;
        }
        if($scope.upContact.address != "")
        {
            $scope.frData.address=$scope.upContact.address;
        }
        if($scope.upContact.dob != "")
        {
            $scope.frData.dob=$scope.upContact.dob;
        }
        friendList.splice($scope.index,1,$scope.frData);
        $location.path('/home')+"successfully updated";
    }
    
});

routerApp.controller("displayFriends",['$scope','$window','displayAll','passData',function($scope,$window,displayAll,passData){
    console.log("Display Friend Controller is loaded");
    $scope.newContact={};
    $scope.res=false; // It will decied --> to show the success/ error div or not.
    $scope.message=""; // Error or Success message
    $scope.se; // It will tell us is it an error or success.
    $scope.addFriendInList=function(){
       try
       {
           var nfr = new Person(global_Personid++,$scope.newContact.name,$scope.newContact.address,$scope.newContact.dob);
           friendList.push(nfr); // List containing the objects of the person class
           $scope.res=true;
           $scope.message="Successfully added a new contact."
           $scope.se=1 // 1 here means success
       }
       catch(err)
       {
           $scope.res=false;
           $scope.se=0 // 0 here means error
           $scope.message=err.message;
       }
    }
    $scope.deleteContact=function(id){
        console.log(" In delete Contact method");
        //friendList = friendList.splice(id-1,1);
        try{
            for(i=0;i<friendList.length;i++)
                {
                    if(friendList[i].id == id)
                    {
                        friendList.splice(i,1);
                    }
                }
            $scope.res=true;
            $scope.se=1
            $scope.message="Deleted the selected contact"
        }
        catch(err)
        {
            $scope.res=false;
            $scope.se=0
            $scope.message=err.message;
        }
    }
    $scope.passtoedit=function(fr){
        console.log("passing data to edit controller");
        var index = -1;
        for(i=0;i<friendList.length;i++)
        {
            if(friendList[i].id == fr.id)
            {
                index = i;
            }
        }
        dataobj={
            friend:fr,
            idx:index};
        passData.set(dataobj);
    }
    $scope.frlist=$window.friendList;
}]);

class Person {
    constructor(id,name,address,dob){
        this.id=id;
        this.name=name;
        this.address=address;
        this.dob=dob;
    }
}