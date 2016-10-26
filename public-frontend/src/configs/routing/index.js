export default ($locationProvider, $urlRouterProvider) => {
    $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
    });
    $urlRouterProvider.otherwise('/home');
};
