/**
 * Created by harsh on 22/6/15.
 */

reportsApp.controller('AddReportController',
    function ($rootScope,$scope,$location, reportSettingService,reportsService,$window,
              ReportAppSectionSettingService,organisationUnitGroupService,$timeout,UserGroupService) {

        $scope.currentReport={
            "id":"",
            "section":"",
            "orgUnitGroup":"",
            "periodType":""
        }

        $scope.periodTypes=[
            {
            "id":"yearly",
            "name":"Yearly"
            },
            {
                "id": "monthly",
                "name": "Monthly"
            },
            {
                "id": "quarterly",
                "name": "Quarterly"
            },
            {
                "id" : "start-end",
                "name" : "Custom - Start and End Date"
            }

        ]
        reportSettingService.getAll().then(function(data){
            $scope.reportSettings = data;
        });

        reportsService.getAllWithDetails().then(function(data){
            $scope.reportList = data.reports;
        });

        ReportAppSectionSettingService.getAllReportAppSection().then(function(data){
        $scope.sectionList = data.sections;
        });

        organisationUnitGroupService.getAll().then(function(data){
           $scope.organisationUnitGroups = data.organisationUnitGroups;
        });

        UserGroupService.getAllUserGroup().then(function(data){
            $scope.userGroups = data.userGroups;
        });

        $scope.save = function(){
            if ($scope.reportSettings == ""){
                // create new json
                $scope.reportSettings={ "reports": [{
                    "id": $scope.currentReport.id,
                    "section": $scope.currentReport.section,
                    "orgUnitGroup": $scope.currentReport.orgUnitGroup,
                    "periodType":$scope.currentReport.periodType
                }]
                }
            }
			else{
                //push to existing json
                $scope.reportSettings.reports.push($scope.currentReport);
            }

        
              //save 
            if ($scope.currentReport.id == "" && $scope.currentReport.orgUnitGroup == "" && $scope.currentReport.section == "" || $scope.currentReport.id == undefined || $scope.currentReport.orgUnitGroup == undefined || $scope.currentReport.section == undefined ) {

                alert("Please fill the required fields");
                
                }
                else {
                    reportSettingService.save($scope.reportSettings).then(function (reponse) {
                        $scope.showSuccess = true;
                        $window.location.reload();
                     })
                  
                    // $timeout(function () {
                    //     $window.location.reload();
                    // }, );
    
                   // return;   
                }
           
        }

        $scope.cancel = function () {
            $location.path('/reports');

        }

    })