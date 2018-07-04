https://github.com/angular/angular-cli/wiki/stories-create-library

cd /mnt/c/Development/quobject.visualstudio.com/qs-ngchips/qs-ngchips-playground;

# terminal 1:
ng build qs-ngchips

# terminal 1:
ng serve


# terminal 1 publish:
ng build qs-ngchips --prod
cd dist/qs-ngchips
npm publish
