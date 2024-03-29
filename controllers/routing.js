var app = require('lib/app')
	, io = require('lib/sio').io
	, path = require('path')
	, express = require('express');
app.use('/stream'     , require('controllers/api/streamCtrl'));
app.use('/auth'       , require('controllers/api/auth/signinCtrl'));
app.use('/user'       , require('controllers/api/user/userCtrl'));
app.use('/items/word' , require('controllers/api/items/wordCtrl'));
app.use('/items'      , require('controllers/api/items/indexCtrl'));
app.use('/items/post' , require('controllers/api/items/postCtrl'));
app.use('/items/image', require('controllers/api/items/imageCtrl'));
app.use('/items/audio', require('controllers/api/items/audioCtrl'));
app.use('/admin/user' , require('controllers/api/admin/userCtrl'));
app.use('/admin/class', require('controllers/api/admin/classCtrl'));

app.use(require('controllers/middlewares/404Midd'));
app.use(require('controllers/middlewares/500Midd'));

require('controllers/events/connection');
io.use(require('controllers/events/message'));
io.use(require('controllers/events/bcMessage'));
io.use(require('controllers/events/additem'));
io.use(require('controllers/events/disconnect'));
io.use(require('controllers/events/allclass'));
io.use(require('controllers/events/addword'));
io.use(require('controllers/events/disconnect'));