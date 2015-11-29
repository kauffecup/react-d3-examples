/** Module dependencies. */
import express    from 'express';
import bodyParser from 'body-parser';
import path       from 'path';
import logger     from 'morgan';
// config for webpack
import webpack              from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config               from './webpack.config';

const app = express();
const compiler = webpack(config);
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// setup middleware
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.set('port', port);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, './public')));

/** Start her up, boys */
app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
