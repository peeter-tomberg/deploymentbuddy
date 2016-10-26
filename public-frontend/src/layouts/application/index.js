export default {
    template: `
        <div flex ng-cloak ui-view></div>
    `,
    resolve: {
        translations: ($rootScope, $q) => {
            const deferred = $q.defer();
            $rootScope.$on('$translateLoadingEnd', deferred.resolve);
            return deferred.promise;
        }
    }
};
