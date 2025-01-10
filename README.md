# recoverysigner-firebase-auth

## Initial setup

- Install [Node.js](https://nodejs.org)
- Install [yarn](https://classic.yarnpkg.com/en/docs/install)
- Run `git clone git@github.com:stellar/recoverysigner-firebase-auth.git`
- Run `cd recoverysigner-firebase-auth && yarn install`
- Create a file under `public/config/env-config.js` with the following code:
  ```js
  window.APP_ENV = {
    FIREBASE_WEB_API_KEY: "your firebase web api key",
    FIREBASE_PROJECT_ID: "your firebase project id",
    TEXT_COLOR: "#fff",
    BACKGROUND_START_COLOR: "#6ececb",
    BACKGROUND_END_COLOR: "#59a4ae",
    LOGO_URL: "https://example.com/logo.svg",
  };
  ```
- Install the [Firebase CLI](https://firebase.google.com/docs/cli)
- Run `firebase login` and follow the instructions
- Run `firebase init`, and enable `Hosting`
- Run `firebase use <project id>`

## Hosting locally

If you're doing something like making UI changes, you can host the app locally.
To do this:

- Run `yarn start`

## Hosting with Firebase

If you have another app that communicates with this one, and you'd like to test
the interaction between the two during development, you can use Firebase to host
this project. To do this:

- Run `yarn build`
  - This exports the project with any code changes you've made, preparing it for
    deploy.
- Run `firebase deploy --public build`
  - The output of this will contain a 'Hosting URL', where you can view the
    project. To avoid browser caching issues, it's best to use a private
    browsing window.

## Trigger auth with phone

Run the following script in your browser console:

```js
main({ phoneNumber: "+15551112222" });
```

A 6-digit code will be sent to that phone number. To complete sign-in, input the
code on the next screen.

## Trigger auth with email

Run the following script in your browser console:

```js
main({
  email: "jordyn@example.com",
  // These settings are used by Firebase to generate a dynamic sign-in link
  dynamicLinkSettings: {
    dynamicLinkDomain: "example.page.link",
    url: "https://example.page.link/auth-email",
    android: { installApp: true, packageName: "io.example.app" },
    iOS: { bundleId: "io.example.app" },
    handleCodeInApp: true,
  },
});
```

A link will be sent to that email. To complete sign-in, refresh the browser and
run:

```js
main({
  email: "jordyn@example.com",
  // link from email
  signInLink:
    "https://example.firebaseapp.com/__/auth/action?apiKey=[apiKey]&mode=signIn&oobCode=[oobCode]&continueUrl=https://sunship.page.link/email-auth&lang=en",
});
```

## Husky

We have Husky configured to run some hooks to execute linter, prettier and tests automatically.
Configured hooks:
- `pre-push`: it will run lint, prettier and tests before push.

To run pre-push checks manually
```bash
$ sh .husky/pre-push
```

## Building production files

- Run `yarn build`
- Copy the config file to `build/config/env-config.js`
- Serve the `build` directory
