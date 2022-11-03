# npm-high-impact

Fetch the npm packages a user is a maintainer of and figure out which of them (if any) are considered high-impact, then prints them to the terminal.

Uses [npm-high-impact](https://github.com/wooorm/npm-high-impact) for the source data.

## Use

This package is ESM only and requires Node.js version 14.14 or above.

```sh
npx npm-high-impact-cli <username>
```

```js
stipsan is the maintainer of 2 of the top 6039 high-impact packages on npm:

scroll-into-view-if-needed
compute-scroll-into-view
```

If no username is provided, the CLI attempts to find the current npm username by running `npm whoami`.

## License

MIT © [Espen Hovlandsdal](https://espen.codes/)
