var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'Partials/partial-home.html'
        })
        
        // nested form for adding new contact
        .state('home.add',{
            url:'^/addcontact',
            templateUrl:'Partials/partial-add.html',
            css:'css/partial-home.css'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
                '': { templateUrl: 'Partials/partial-about.html' },
                'columnOne@about': { template: 'Look I am a column!' },
                'columnTwo@about': { 
                    templateUrl: 'Partials/table-data.html',
                    controller: 'scotchController'
                }
            }
            
        });
        
});

routerApp.controller('scotchController', function($scope) {
    
    $scope.message = 'test';
   
    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];
    
});


var displayListAll=function(){
        var friendList=[sg,aj,tr,mj,kr,sm,ag,ck,ms];
        return friendList;  
}
routerApp.factory("displayAll",displayListAll); // Retrieve all the friends
routerApp.controller("displayFriends",function($scope,displayAll){
    console.log("Display Friend Controller is loaded");
    $scope.frlist=displayAll;

    $scope.addFriendInList=function(){
        // code to add new element
    }
});

class Person {
    constructor(id,name,address,dob){
        this.id=id;
        this.name=name;
        this.address=address;
        this.dob=dob;
    }
}

var aj = new Person(1,"Akshat Jhalani","D-702,Marvel Fria","01/01/1994");
var sg = new Person(2,"Shaifali Gupta","A-56, Triveni Nagar","03/11/1987");
var tr = new Person(3,"Tejas Ratnapogol","khatraj, pune","01/01/1994");
var mj = new Person(4,"Monika Jengaria","Ganga Constella","11/09/1992");
var ck = new Person(5,"Chinmay Kishore","Bollywood Theater, wadgaon sheri","01/01/1994");
var ms = new Person(6,"Mandeep Singh Beniwal","Bollywood Theater, wadgaon sheri", "01/01/1994");
var kr = new Person(7,"Kumar Rahul","Bollywood Theater, wadgaon sheri","01/01/1994");
var ag = new Person(8,"Arpita Ghosh","Ganga Constella","01/01/1994");
var sm = new Person(9,"Suvidha Maheshawari","Kahin Dur in pune ","01/01/1994");

var global_Personid=9;

// CRUD operations on FriendList =========================================

//Friend class is needed to the created

// var displayList=function(id){
//     var friendList;
//     switch(id){
//         case a:  { return friendList =["b","d","e"]; }
//         case b:  { return friendList =["a","c","d"]; }
//         case c:  { return friendList =["b","e"]; }
//         case d:  { return friendList =["a","b"]; }
//         case e:  { return friendList =["a","e"]; }
//     }
// }

//routerApp.factory("addFriend",addFriend(friend)); // Create
//routerApp.factory("dispFriendsList",displayList(id)); // Retrive
//routerApp.factory("updateFriend",updateFriend(friend)); // update
//routerApp.factory("unFriend",deleteFriend(id)); //Delete