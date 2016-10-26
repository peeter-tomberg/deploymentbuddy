export default {
    parent: 'ApplicationLayout',
    template: `
        <div layout="column">
            <md-toolbar layout="row">
                <div class="md-toolbar-tools">
                    <md-button hide-gt-md ng-click="vm.toggle()">
                        <md-icon md-font-set="material-icons">menu</md-icon>
                    </md-button>
                    <h2>Deploymentbuddy</h2>
                    <span flex></span>
                    <md-button ng-click="vm.login()">
                        Login
                    </md-button>
                </div>
            </md-toolbar>
        </div>
        <div layout-fill layout="row">
            <md-sidenav layout-fill class="md-sidenav-left" md-component-id="left" md-is-locked-open="vm.$mdMedia('gt-md')">
                <md-content layout-padding>
                    <md-list>
                        <md-list-item ui-sref="home()" ng-click="vm.toggle()" class="md-2-line">
                            <md-icon md-font-set="material-icons">home</md-icon>
                            <span class="md-list-item-text">Home</span>
                        </md-list-item>
                    </md-list>
                </md-content>
            </md-sidenav>
            <md-content flex ui-view></md-content>
        </div>
    `,
    controller ($mdSidenav, $mdMedia, $mdDialog) {
        this.$mdMedia = $mdMedia;
        this.toggle = () => $mdSidenav('left').toggle();
        this.login = () => {
            $mdDialog.show({
                controller () {
                    this.close = () => $mdDialog.hide();
                },
                controllerAs: 'vm',
                template: `
                    <md-dialog aria-label="Login">
                            <auth-login layout-fill on-close="vm.close()"></auth-login>
                    </md-dialog>
                `,
                fullscreen: true
            });
        };
    }
};
