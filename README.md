# react + d3 = <3

This is an app with four different React + D3 examples. Those examples can be
found under `client/componets/example_XX`. They grow in complexity but
ultimately build an animated bubble chart from the data under
`reducers/data_XX.json`.

![screenshot](http://i.imgur.com/TvjpTZO.png)

## Running the app

```sh
npm install
npm start
```

## Structure

The app is structured using [Redux](http://redux.js.org/) as a flux alternative
and uses the [Redux Dev Tools](https://github.com/gaearon/redux-devtools) along
with the [React Hot Loader](https://gaearon.github.io/react-hot-loader/) to
provide an awesome development experience.

## References

For a final version of the bubble chart that we're building here, head over to
the [React Bubble Chart](https://github.com/kauffecup/react-bubble-chart) repo,
and for a more thorough development/production boilerplate using redux and react
hot loader, head over to the
[React Redux Webpack Boilerplate](https://github.com/kauffecup/react-redux-webpack-boilerplate)
repo. You can also read my blog post on using react with D3
[here](http://www.jkaufman.io/react-d3-love/).
