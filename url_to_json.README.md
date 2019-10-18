# Transfer URLs to JSON API

### input:

```
HIVE/mr-compute-prod/default.abc
HIVE/mr-compute-prod/defaultRM.abc
HIVE/mr-storage-prod/default.accounts_quota_sl_join
Hadoop/mr-storage-prod/default.al_account_groomer_status_secondary
```

### output:

```
const route = [
 {
   path: '/Hive',
   name: 'Hive',
   children: [
     {
       path: '/mr-compute-prod',
       name: 'mr-compute-prod',
       children: [
         {
           path: '/default.abc',
           component: 'default.abc'
         },
         {
           path: '/defaultRM.abc',
           component: 'defaultRM.abc'
         }
       ]
     },
     {
       path: '/mr-storage-prod',
       name: 'mr-storage-prod',
       children: [
         {
           path: '/default.accounts_quota_sl_join',
           component: 'default.accounts_quota_sl_join'
         }
       ]
     }
   ]
 },
     {
       path: '/Hadoop',
   name: 'Hadoop',
   children: [
     {
       path: '/mr-storage-prod',
       name: 'mr-storage-prod',
       children:[
         path: '/default.al_account_groomer_status_secondary',
         component: 'default.al_account_groomer_status_secondary'
       ]
     }
   ]
 }
]
```

##### A tiny contribution for Apple as a developer
