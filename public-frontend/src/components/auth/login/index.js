import { Component } from 'opus-angular-seed-core';

@Component({
    bindings: {
        onClose: '&'
    },
    template: `
        <md-toolbar>
            <div class="md-toolbar-tools">
                <h2>Login</h2>
                <span flex></span>
                <md-button class="md-icon-button" ng-click="vm.onClose()">
                    <md-icon md-font-set="material-icons">close</md-icon>
                </md-button>
            </div>
        </md-toolbar>
        <md-dialog-content>
            <div class="md-dialog-content">
                <h2>Sign up by via one of the social sites below</h2>
                <div layout="row">
                    <md-button ng-click="answer('useful')">
                        Facebook
                    </md-button>
                    <md-button ng-click="answer('useful')">
                        Google
                    </md-button>
                </div>
            </div>
        </md-dialog-content>
    `
})
export default class {

}
