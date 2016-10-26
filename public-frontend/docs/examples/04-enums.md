<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
Content

- [Understanding enums](#understanding-enums)
  - [Example enums (index.js file contents)](#example-enums-indexjs-file-contents)
  - [Autoloading](#autoloading)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Understanding enums

Enums are a collection of keys and their translated labels.

`ENUM.KEYS` are used to compare values.
```
if (this.user.status === this.USER_TYPE_ENUM.KEYS.ACTIVE) {
    // user is active
}
```
`ENUM.LABELS` are used to show the translated value to the client. E.g.

```
<p>{{ vm.USER_TYPE_ENUM.LABELS[vm.user.status] }}</p>
```

## Example enums (index.js file contents)

```
export default function ($translate) {
    return {
        KEYS: {
            ACTIVE: 'ACTIVE',
            INACTIVE: 'INACTIVE'
        },
        LABELS: {
            ACTIVE: $translate.instant('Active'),
            INACTIVE: $translate.instant('Inactive')
        }
    };
}
```


## Autoloading

|File path|Registered as (in Angular)|
|---|---|
|src/enums/user/type/index.js|USER_TYPE_ENUM|
