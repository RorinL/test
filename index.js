!function() {
    var r = []
      , d = parseFloat(seajs.version);
    define("photo.v7/common/viewer2/index", ["photo.v7/lib/jquery", "photo.v7/lib/photo", "v8/ic/videoManager/videoUtil", "hybridPath/common/videoPlayer/index", "hybridPath/common/videoPlayer/lib/video/PCTxVideo/index", "hybridPath/common/videoPlayer/lib/video/HlsVideo/index", "photo.v7/common/api/qboss/ajax.get.js"], function(require, exports, module) {
        for (var e, t, i = (module.uri || module.id).split("?")[0].match(/^(.+\/)([^\/]*?)(?:\.js)?$/i), o = i && i[1], n = i && "./" + i[2], s = 0, a = r.length, n = n.replace(/\.r[0-9]{15}/, ""); s < a; s++)
            "string" == typeof (t = r[s])[0] && (n === t[0] && (e = t[2]),
            t[0] = o + t[0].replace("./", ""),
            1 < d && define.apply(this, t));
        return r = [],
        require.get = require,
        "function" == typeof e ? e.apply(this, arguments) : require
    }),
    define.pack = function() {
        r.push(arguments),
        1 < d || define.apply(null, arguments)
    }
}(),
define.pack("./api.photos", ["photo.v7/lib/jquery", "photo.v7/lib/photo", "./event", "./util"], function(require, exports, module) {
    var d, n, h = require("photo.v7/lib/jquery"), u = require("photo.v7/lib/photo"), m = (require("./event"),
    require("./util")), g = {}, o = {};
    return h.extend(g, {
        getcmtreply: function(e) {
            d = slide.config;
            var i = h.Deferred()
              , t = d.stat.returnCode
              , e = h.extend({
                url: "http://taotao.qq.com/cgi-bin/emotion_cgi_getcmtreply_v6",
                type: "get",
                requestType: "jsonp",
                jsonpCallback: "viewer_Callback",
                cbName: "viewer_Callback",
                charsetType: "UTF8",
                noNeedAutoXss: !0,
                cache: !1,
                data: e.data,
                returnCode: t,
                success: function(e) {
                    var t;
                    endTime = +new Date,
                    e && 0 == e.code ? ((t = e.data || e).photos,
                    new Date,
                    i.resolve.call(i, t)) : i.reject.call(i, e)
                },
                error: function(e) {
                    endTime = +new Date,
                    i.reject.apply(i, arguments),
                    m.stat.pingpv("serverError")
                },
                timeout: 1e4
            }, e);
            return u.ajax.request(e),
            i.promise()
        },
        getPhotos: function(e) {
            var a = e && e.data && e.data.useWebappCgi;
            d = slide.config,
            n = a ? d.webappCgi : d.cgi;
            var r = h.Deferred()
              , t = d.stat.returnCode
              , i = (new Date,
            !e.first && n.queryList || n.getPhotos)
              , o = a && d.webappReqDataAdatper ? d.webappReqDataAdatper(e.data) : {};
            if (self = this,
            d.cgi && "comment" == d.cgi.type) {
                if (4 == d.appid)
                    return this.getCommentPhotos(e, i);
                if (311 == d.appid)
                    return this.getCommentShuoshuo(e, i)
            } else {
                if (d.cgi && "video" == d.cgi.type)
                    return this.getVideoShuoshuo(e, i);
                if (d.cgi && "videoandrec" == d.cgi.type)
                    return this.getVideoRec(e, i);
                if (d.cgi && "photo" == d.cgi.type) {
                    if (202 == d.appid)
                        return this.getSharePhoto(e, i)
                } else if (d.cgi && "album" == d.cgi.type && 202 == d.appid)
                    return this.getShareAlbum(e, i)
            }
            return i = self.fixCgiUrl(i),
            e.data = h.extend(e.data, o),
            e = h.extend({
                url: i,
                type: "get",
                requestType: a ? "json" : "jsonp",
                jsonpCallback: "viewer_Callback",
                cbName: "viewer_Callback",
                charsetType: "UTF8",
                noNeedAutoXss: !0,
                cache: !1,
                data: e.data,
                returnCode: t,
                success: function(e) {
                    if (new Date,
                    e && 0 == e.code) {
                        for (var t = e.data || e, i = (t = a && d.webappResDataAdatper ? d.webappResDataAdatper(t) : t).photos || [], o = new Date, n = 0, s = i.length; n < s; n++)
                            m.processSinglePhotoVideoData(i[n], o);
                        r.resolve.call(r, t)
                    } else
                        r.reject.call(r, e)
                },
                error: function(e) {
                    new Date,
                    r.reject.apply(r, arguments),
                    m.stat.pingpv("serverError")
                },
                timeout: 1e4
            }, e),
            u.ajax.request(e),
            r.promise()
        },
        fixCgiUrl: function(e) {
            if (!slide.option.type && 4 == slide.option.appid && e && 0 <= e.indexOf("plist.photo.qq.com")) {
                var t, i, o = QZONE && QZONE.FP && QZONE.FP._t.QZFL.dataCenter, n = e, s = "user_domain_" + slide.option.ownerUin;
                return o && (t = o.get(s)),
                t && (n = "http://" + (i = t[t.domain.default]).s + "/fcgi-bin/cgi_floatview_photo_list_v2"),
                !i || "xaplist.photo.qq.com" !== i.s && "hzplist.photo.qq.com" !== i.s && "gzplist.photo.qq.com" !== i.s && "shplist.photo.qq.com" !== i.s ? n : e
            }
            return e
        },
        getVideoShuoshuo: function(e, t) {
            var d = h.Deferred();
            e.data.getMethod = 3;
            var l = QZONE.FP.getQzoneConfig("ownerUin")
              , p = QZONE.FP.getNickname()
              , c = slide.option.picKey
              , e = h.extend({
                url: t,
                type: "get",
                requestType: "jsonp",
                jsonpCallback: "viewer_Callback",
                cbName: "viewer_Callback",
                charsetType: "UTF8",
                noNeedAutoXss: !0,
                cache: !1,
                data: e.data,
                success: function(e) {
                    if (e && 0 == e.code) {
                        var t = e.data
                          , i = t.photos[t.picPosInPage];
                        i.picKey == c && (t.photos = [i]);
                        for (var o = t.photos, n = new Date, s = {
                            ownerUin: l,
                            ownerName: p
                        }, a = 0, r = o.length; a < r; a++)
                            m.processSingleVideoShuoShuoData(o[a], n, s);
                        d.resolve.call(d, t)
                    } else
                        d.reject.call(d, e)
                },
                error: function(e) {
                    d.reject.apply(d, arguments),
                    m.stat.pingpv("serverError")
                },
                timeout: 1e4
            }, void 0);
            return u.ajax.request(e),
            d.promise()
        },
        getVideoRec: function(p, e) {
            var c = h.Deferred();
            return seajs.use(["photo.v7/common/videoRec/videoRec"], function(e) {
                var l;
                e ? (e = e.get("./index"),
                l = slide.option.videoInfo,
                e.getRecList({
                    uin: l.ownerUin,
                    appid: l.appid,
                    tid: l.tid,
                    subid: l.subid,
                    video_url: l.videoSrc,
                    attach_info: slide.option.attach_info,
                    scene: 2
                }, {
                    detail: 1
                }).done(function(e) {
                    var t, i = e.data.recList || [];
                    p.first && (a = [(t = i[0] || {}).ownerUin || "", t.appid || "", t.tid || "", t.subid || ""].join("_"),
                    d = [l.origUin || l.ownerUin || "", l.appid || "", l.origTid || l.tid || "", l.subid || ""].join("_"),
                    t && t.videoId && a == d || ((r = g.makeFakeVideoRecData(l)).videoId != t.videoId && r.videoId != t.videoIdForFilter || (i.shift(),
                    m.stat.reportTextToCompass(["recvideo first error:", "ugckey : " + [l.ownerUin, l.appid, l.tid, l.subid || ""].join("_"), "video_url : " + l.videoSrc, "videoId : " + l.videoId, "origUgcKey : " + d, "firstUgcKey : " + a].join("\n"), "recvideo/firsterror")),
                    i.unshift(r))),
                    slide.option.attach_info = e.data.attach_info;
                    for (var o = new Date, n = 0, s = i.length; n < s; n++)
                        m.processSingleVideoRecData(i[n], o);
                    var a, r, d = {};
                    d.photos = i,
                    p.first && (d.first = 1,
                    d.picPosInPage = 0,
                    d.picPosInTotal = 0,
                    (a = i[d.picTotal = 0]).beginTime = slide.option.beginTime || 0,
                    5 == a.videoType && l && a.videoId == l.videoId && (a.videoSrc = l.videoSrc,
                    a.videoWidth = l.videoWidth,
                    a.videoHeight = l.videoHeight,
                    a.videoCover = l.videoCover,
                    a.videoDuration = l.videoDuration,
                    r = a.videoExtend,
                    a.videoExtend = h.extend(!0, {}, l.videoExtend, {
                        _fromFeed: l.videoExtend,
                        _fromRec: a.singlefeed && a.singlefeed[51]
                    }),
                    a.videoExtend && (a.videoExtend.viewerNum = r.viewerNum,
                    a.videoExtend.likeNum = r.likeNum),
                    m.processSingleVideoRecData(a))),
                    d.last = e.data.hasmore ? 0 : 1,
                    c.resolve(d)
                }).fail(function(e) {
                    e.ret && (e.code = e.ret),
                    e.msg && (e.message = e.msg),
                    c.reject.apply(c, arguments),
                    m.stat.pingpv("serverError")
                })) : c.reject({
                    code: -1,
                    message: "加载推荐模块js失败"
                })
            }),
            c.promise()
        },
        makeFakeVideoRecData: function(e) {
            return {
                isFakeData: !0,
                ownerUin: e.origUin || e.ownerUin,
                appid: e.appid,
                tid: "",
                subid: "",
                videoId: e.videoId,
                videoIdForFilter: e.videoIdForRec || e.videoId,
                videoSrc: e.videoSrc,
                videoWidth: e.videoWidth,
                videoHeight: e.videoHeight,
                videoTitle: e.videoTitle,
                videoDesc: e.videoDesc,
                videoType: e.videoType,
                videoCover: e.videoCover,
                videoDuration: e.videoDuration,
                videoExtend: e.videoExtend
            }
        },
        getCommentShuoshuo: function(e, t) {
            var l = h.Deferred();
            e = e || {};
            var i = {
                data: {}
            };
            return i.data.t1_source = 1,
            i.data.topicId = slide.option.topicId,
            i.data.t2_uin = e.uin || slide.option.ownerUin,
            i.data.t2_tid = slide.option.commentId,
            i.data.format = "jsonp",
            i.data.qzone = "qzone",
            i.data.plat = "qzone",
            i.data.need_private_comment = e.data && e.data.need_private_comment || 0,
            i = h.extend({
                url: t,
                type: "get",
                requestType: "jsonp",
                jsonpCallback: "viewer_Callback",
                cbName: "viewer_Callback",
                charsetType: "UTF8",
                noNeedAutoXss: !0,
                cache: !1,
                data: i.data,
                success: function(e) {
                    if (e && 0 == e.code) {
                        for (var t = {}, i = e.result && e.result.post || {}, o = h.extend(i.pic, []), n = h.extend(!0, {}, i), s = (e.data.picKey,
                        i.createTime2), a = 0; a < o.length; a++) {
                            var r = o[a];
                            r.url = r.b_url,
                            r.width = +r.b_width,
                            r.height = +r.b_height,
                            r.topicId = r.topicId || slide.option.topicId,
                            r.commentId = slide.option.commentId,
                            r.ownerUin = n.owner.uin || slide.option.ownerUin,
                            r.ownerName = n.owner.name,
                            r.pre = r.s_url,
                            r.picKey = r.pre,
                            r.createTime = s
                        }
                        t.photos = h.extend([], o),
                        t.single = {},
                        n.replies = n.replies || [];
                        n.replies;
                        for (n.poster = {
                            id: n.owner.uin,
                            name: n.owner.name
                        },
                        n.postTime = n.create_time,
                        n.id = n.tid,
                        a = 0; a < n.replies.length; a++) {
                            var d = n.replies[a];
                            d.id = d.tid,
                            d.poster = {
                                id: d.owner.uin,
                                name: d.owner.name
                            }
                        }
                        t.single.comments = [n],
                        t.picPosInTotal = t.photos.length,
                        l.resolve.call(l, t)
                    } else
                        l.reject.call(l, e)
                },
                error: function(e) {
                    l.reject.apply(l, arguments),
                    m.stat.pingpv("serverError")
                },
                timeout: 1e4
            }, i),
            u.ajax.request(i),
            l.promise()
        },
        getCommentPhotos: function(e, t) {
            var r = h.Deferred();
            return (e = e || {}).data.albumId = e.data.albumId || slide.option.topicId.split("_")[0],
            e.data.topicId = slide.option.topicId || e.data.albumId + "_" + slide.option.picKey,
            e.data.commentId = e.data.commentId || slide.option.commentId,
            e.data.start = 0,
            e.data.num = 10,
            e.data.order = 0,
            e.data.format = "jsonp",
            e.data.qzone = "qzone",
            e.data.plat = "qzone",
            e = h.extend({
                url: t,
                type: "get",
                requestType: "jsonp",
                jsonpCallback: "viewer_Callback",
                cbName: "viewer_Callback",
                charsetType: "UTF8",
                noNeedAutoXss: !0,
                cache: !1,
                data: e.data,
                success: function(e) {
                    if (e && 0 == e.code) {
                        for (var t = {}, i = h.extend(e.data.comments && e.data.comments[0].pic, []), o = (e.data.comments[0].content,
                        e.data.comments[0].poster), n = (e.data.picKey,
                        e.data.comments[0].postTime), s = 0; s < i.length; s++) {
                            var a = i[s];
                            a.url = a.b_url,
                            a.width = +a.b_width,
                            a.height = +a.b_height,
                            a.topicId = a.topicId || slide.option.topicId,
                            a.commentId = slide.option.commentId,
                            a.ownerUin = slide.option.ownerUin,
                            a.ownerName = o.name,
                            a.pre = a.s_url,
                            a.picKey = a.pre,
                            a.uploadTime = n
                        }
                        t.photos = h.extend([], i),
                        t.single = {};
                        e.data.comments[0].replies;
                        t.single.comments = e.data.comments,
                        t.picPosInTotal = t.photos.length,
                        r.resolve.call(r, t)
                    } else
                        r.reject.call(r, e)
                },
                error: function(e) {
                    r.reject.apply(r, arguments),
                    m.stat.pingpv("serverError")
                },
                timeout: 1e4
            }, e),
            u.ajax.request(e),
            r.promise()
        },
        getShareInfo: function() {
            var a, r, d, l = h.Deferred();
            function t() {
                if (!d && a && r) {
                    d = !0,
                    a.shareUser = {
                        uin: slide.option.ownerUin
                    };
                    for (var e, t = u.ubb.ubb2nodes(a.description || "") || [], i = 0, o = t.length; i < o; i++)
                        if ("user" == (e = t[i]).type && e.content && e.content.uin == a.shareUser.uin) {
                            a.shareUser.nick = e.content.nick;
                            break
                        }
                    for (var n, s = [], i = 0, o = r.imageKeys.length; i < o; i++)
                        n = {
                            picKey: i == slide.option.shareParam.picIndex ? slide.option.picKey : "share_album_photo_" + i,
                            imageKey: r.imageKeys[i],
                            pre: r.imageUrls[i],
                            url: r.imageUrls[i],
                            cmtTotal: -1
                        },
                        s.push(n);
                    l.resolve({
                        shareInfo: a,
                        photos: s
                    })
                }
            }
            return u.ajax.request({
                url: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshareget_description",
                type: "get",
                requestType: "jsonp",
                jsonpCallback: "viewer_Callback",
                cbName: "viewer_Callback",
                charsetType: "UTF8",
                noNeedAutoXss: !0,
                cache: !1,
                data: {
                    fupdate: 1,
                    platform: "qzone",
                    uin: slide.option.ownerUin,
                    itemid: slide.option.topicId
                },
                success: function(e) {
                    e && 0 == e.code ? (a = e.data || {},
                    t()) : l.reject.call(l, e)
                },
                error: function(e) {
                    l.reject.apply(l, arguments)
                },
                timeout: 1e4
            }),
            u.ajax.request({
                url: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshareget_images",
                type: "get",
                requestType: "jsonp",
                jsonpCallback: "viewer_Callback",
                cbName: "viewer_Callback",
                charsetType: "UTF8",
                noNeedAutoXss: !0,
                cache: !1,
                data: {
                    fupdate: 1,
                    platform: "qzone",
                    uin: slide.option.ownerUin,
                    shareid: slide.option.topicId
                },
                success: function(e) {
                    e && 0 == e.code ? (r = e.data || {},
                    t()) : l.reject.call(l, e)
                },
                error: function(e) {
                    l.reject.apply(l, arguments)
                },
                timeout: 1e4
            }),
            l.promise()
        },
        getSharePhoto: function(e, t) {
            var i, o, n, s, a = h.Deferred();
            function r() {
                var e, t;
                !s && i && o && n && (s = !0,
                slide.shareInfo = i,
                e = parseInt(slide.option.shareParam.picIndex) || 0,
                o[e].is_video = n.is_video,
                o[e].video_info = n.video_info,
                m.processSinglePhotoVideoData(o[e], new Date),
                (t = {}).picTotal = o.length,
                t.photos = o,
                t.picPosInPage = e,
                t.picPosInTotal = e,
                t.first = 1,
                t.last = 1,
                a.resolve(t))
            }
            return e.first && (slide.shareInfo = null,
            g.getShareInfo().done(function(e) {
                i = e.shareInfo,
                o = e.photos,
                r()
            }).fail(function(e) {
                a.reject.apply(a, arguments)
            }),
            n = {},
            r()),
            a.promise()
        },
        getShareAlbum: function(e, t) {
            var i, o, n, s = h.Deferred();
            return e.first && (slide.shareInfo = null,
            g.getShareInfo().done(function(e) {
                var t;
                i = e.shareInfo,
                o = e.photos,
                !n && i && o && (n = !0,
                slide.shareInfo = i,
                t = parseInt(slide.option.shareParam.picIndex) || 0,
                (e = {}).picTotal = o.length,
                e.photos = o,
                e.picPosInPage = t,
                e.picPosInTotal = t,
                e.first = 1,
                e.last = 1,
                s.resolve(e))
            }).fail(function(e) {
                s.reject.apply(s, arguments)
            })),
            s.promise()
        },
        getRoute: function(e) {
            var t = h.Deferred()
              , i = e.uin
              , e = {
                url: "http://route.store.qq.com/GetRoute",
                type: "get",
                requestType: "jsonp",
                jsonpCallback: "photoDomainNameCallback",
                data: {
                    UIN: i,
                    type: "json",
                    version: 2
                },
                success: function(e) {
                    e && e.domain ? (o[i] = e[e.domain.default],
                    t.resolve.call(t, o[i])) : t.reject.call(t, e)
                },
                error: function(e) {
                    t.reject.apply(t, arguments)
                },
                timeout: 1e4
            };
            return o[i] ? setTimeout(function() {
                t.resolve.call(t, o[i])
            }, 0) : u.ajax.request(e),
            t.promise()
        },
        getAlbumList: function(t) {
            var i = h.Deferred()
              , o = this;
            return this.getRoute({
                uin: t.hostUin
            }).done(function(e) {
                t.route = e,
                o._getAlbumList(t).done(function(e) {
                    i.resolve.call(i, e)
                })
            }).fail(function() {
                i.reject.apply(i, arguments)
            }),
            i.promise()
        },
        saveRotatePhoto: function(t) {
            var i = h.Deferred();
            return this.getRoute({
                uin: t.uin
            }).done(function(e) {
                e = e.nu;
                u.ajax.request({
                    url: "http://" + e + "/cgi-bin/common/cgi_rotation_pic",
                    type: "post",
                    requestType: "formSender",
                    charsetType: "GBK",
                    qzoneCoolCbName: !0,
                    jsonpCallback: "_Callback",
                    data: {
                        plat: "qzone",
                        source: "qzone",
                        uin: t.uin,
                        is_delete: 1,
                        frameno: 1,
                        output_type: "jsonhtml",
                        angle: t.angle,
                        albumid: t.topicId || t.albumid,
                        lloc: t.lloc,
                        t: Math.random()
                    },
                    success: function(e) {
                        i.resolve.call(i, e)
                    },
                    error: function(e) {
                        i.reject.apply(i, arguments)
                    }
                })
            }).fail(function() {
                i.reject.apply(i, arguments)
            }),
            i.promise()
        },
        getYellowUrl: function(t) {
            var i = h.Deferred();
            return this.getRoute({
                uin: t.uin
            }).done(function(e) {
                e = e.nu;
                u.ajax.request({
                    url: "http://" + e + "/cgi-bin/common/cgi_yurl_get_v2",
                    type: "get",
                    requestType: "jsonp",
                    dataType: "jsonp",
                    jsonpCallback: "_Callback",
                    data: {
                        inCharset: "gbk",
                        outCharset: "gbk",
                        hostUin: t.uin,
                        plat: "qzone",
                        source: "qzone",
                        uin: t.uin,
                        refresh: t.refresh || 0,
                        output_type: "json",
                        t: Math.random()
                    },
                    success: function(e) {
                        i.resolve.call(i, e)
                    },
                    error: function(e) {
                        i.reject.apply(i, arguments)
                    }
                })
            }).fail(function() {
                i.reject.apply(i, arguments)
            }),
            i.promise()
        },
        getShortUrl: function(t) {
            var i = h.Deferred();
            return this.getRoute({
                uin: t.uin
            }).done(function(e) {
                e = e.nu;
                u.ajax.request({
                    url: "http://" + e + "/cgi-bin/common/cgi_short_url_v2",
                    type: "post",
                    requestType: "formSender",
                    charsetType: "GBK",
                    qzoneCoolCbName: !0,
                    jsonpCallback: "_Callback",
                    data: {
                        inCharset: "gbk",
                        outCharset: "gbk",
                        hostUin: t.uin,
                        notice: 0,
                        format: "fs",
                        plat: "qzone",
                        source: "qzone",
                        appid: 4,
                        uin: t.uin,
                        albumId: t.albumId || t.albumid,
                        yurl: 1,
                        lloc: t.lloc,
                        refer: "qzone",
                        t: Math.random()
                    },
                    success: function(e) {
                        i.resolve.call(i, e)
                    },
                    error: function(e) {
                        i.reject.apply(i, arguments)
                    }
                })
            }).fail(function() {
                i.reject.apply(i, arguments)
            }),
            i.promise()
        },
        setYurl: function(e) {
            var t = h.Deferred();
            return u.ajax.request({
                url: "http://photo.qq.com/cgi-bin/common/cgi_yurl_set_v2",
                type: "post",
                requestType: "formSender",
                charsetType: "GBK",
                qzoneCoolCbName: !0,
                jsonpCallback: "_Callback",
                data: e,
                success: function(e) {
                    t.resolve.call(t, e)
                },
                error: function(e) {
                    t.reject.apply(t, arguments)
                }
            }),
            t.promise()
        },
        editDesc: function(t) {
            var i = h.Deferred();
            return this.getRoute({
                uin: t.uin
            }).done(function(e) {
                e = e.nu;
                u.ajax.request({
                    url: "http://" + e + "/cgi-bin/common/cgi_modify_multipic_v2",
                    type: "post",
                    requestType: "formSender",
                    charsetType: "GBK",
                    qzoneCoolCbName: !0,
                    jsonpCallback: "_Callback",
                    data: {
                        inCharset: "utf-8",
                        outCharset: "utf-8",
                        hostUin: t.uin,
                        notice: 0,
                        format: "fs",
                        plat: "qzone",
                        source: "qzone",
                        appid: 4,
                        uin: t.uin,
                        albumId: t.albumId || t.albumid,
                        piccount: 1,
                        total: 1,
                        modify_type: 1,
                        lloc: t.lloc,
                        refer: "qzone",
                        t: Math.random()
                    },
                    success: function(e) {
                        i.resolve.call(i, e)
                    },
                    error: function(e) {
                        i.reject.apply(i, arguments)
                    }
                })
            }).fail(function() {
                i.reject.apply(i, arguments)
            }),
            i.promise()
        },
        getExifInfo: function(t) {
            var i = h.Deferred();
            return this.getRoute({
                uin: t.photoOwner || t.uin || t.ownerUin
            }).done(function(e) {
                e = e.nu;
                u.ajax.request({
                    url: "http://" + e + "/cgi-bin/common/cgi_get_exif_v2",
                    type: "get",
                    requestType: "jsonp",
                    dataType: "jsonp",
                    qzoneCoolCbName: !0,
                    jsonpCallback: "_Callback",
                    data: {
                        inCharset: "utf-8",
                        outCharset: "utf-8",
                        hostUin: t.photoOwner || t.originOwnerUin || t.uin || t.ownerUin,
                        plat: "qzone",
                        source: "qzone",
                        topicId: t.albumId || t.albumid || t.topicId,
                        lloc: t.lloc,
                        refer: "qzone",
                        t: Math.random()
                    },
                    success: function(e) {
                        i.resolve.call(i, e)
                    },
                    error: function(e) {
                        i.reject.apply(i, arguments)
                    }
                })
            }),
            i.promise()
        },
        _getAlbumList: function(e) {
            var i = h.Deferred()
              , t = e.route
              , e = {
                hostUin: e.hostUin,
                uin: e.uin,
                plat: "qzone",
                source: "qzone",
                format: "jsonp",
                inCharset: "utf-8",
                outCharset: "utf-8",
                notice: 0,
                mode: 2,
                sortOrder: 4,
                pageStart: 0,
                pageNum: 1e3
            }
              , e = {
                url: "http://" + t.p.replace("sznewp", "alist").replace("xanewp", "xalist") + "/fcgi-bin/fcg_list_album_v3",
                type: "get",
                requestType: "jsonp",
                jsonpCallback: "_Callback",
                cache: !1,
                noNeedAutoXss: !0,
                data: e,
                success: function(e) {
                    var t;
                    e && 0 == e.code ? ((t = e.data || e) && !t.album && t.albumList && (t.album = t.albumList),
                    i.resolve.call(i, e.data || e)) : i.reject.call(i, e)
                },
                error: function(e) {
                    i.reject.apply(i, arguments)
                },
                timeout: 1e4
            };
            return u.ajax.request(e),
            i.promise()
        },
        commentAlbum: function(e) {
            var t = h.Deferred()
              , e = {
                url: "http://photo.qq.com/cgi-bin/common/cgi_add_piccomment_v2",
                type: "post",
                requestType: "formSender",
                charsetType: "utf-8",
                data: {
                    hostUin: e.hostUin,
                    topicId: e.topicId,
                    plat: "qzone",
                    refer: "viewer2",
                    commentUin: QZONE.FP.getQzoneConfig().loginUin,
                    content: e.content,
                    inCharset: "utf-8",
                    outCharset: "utf-8",
                    source: "qzone",
                    albumId: e.topicId,
                    albumid: e.topicId,
                    plat: "qzone"
                },
                success: function(e) {
                    (e && 0 == e.code ? t.resolve : t.reject).call(t, e)
                },
                error: function(e) {
                    t.reject.apply(t, arguments)
                },
                timeout: 1e4
            };
            return u.ajax.request(e),
            t.promise()
        },
        loadSensibleEditor: function() {
            var t = h.Deferred();
            return j$.load({
                id: "/f4a/lite:1.3",
                onSuccess: function(e) {
                    seajs.use("http://" + siDomain + "/qzone/app/controls/sensibleEditor/sensibleEditor_2.1.js", function() {
                        F4A.controls.Base.loadDefinition("FriendSelector", {
                            version: "2.1",
                            nameSpace: "F4A.controls.SensibleEditor.responsors",
                            onSuccess: function() {
                                t.resolve()
                            }
                        })
                    })
                }
            }),
            t.promise()
        },
        modifyDesc: function(t) {
            var i = h.Deferred()
              , e = slide.config;
            if (421 != t.appid && 421 != e.appid)
                return seajs.use("photo.v7/common/photoList/ajax.modify", function(e) {
                    e.modify({
                        album: {
                            id: t.album.topicId,
                            priv: t.album.priv
                        },
                        name: t.name,
                        desc: t.desc,
                        picArr: t.picArr
                    }).fail(function(e) {
                        QZONE.FP.showMsgbox(e && e.message || "修改失败，请稍后再试", 5, 2e3),
                        i.reject.call(i, e)
                    }).done(function(e) {
                        e && 0 == e.code ? (QZONE.FP.showMsgbox("修改成功！", 4, 2e3),
                        i.resolve.call(i, e)) : (QZONE.FP.showMsgbox(e && e.message || "修改失败，请稍后再试", 5, 2e3),
                        i.reject.call(i, e))
                    })
                }),
                i.promise();
            var o = {
                qunId: t.picArr[0].groupId || GroupZone && GroupZone.GPHOTO && GroupZone.GPHOTO.groupId,
                uin: t.uin || u.user.getLoginUin(),
                albumId: t.picArr[0].albumId,
                photoId: t.picArr[0].picKey,
                platform: "qzone",
                inCharset: "utf-8",
                outCharset: "utf-8",
                source: "qzone"
            }
              , e = window.location.protocol + "//h5.qzone.qq.com/proxy/domain/u.photo.qzone.qq.com/cgi-bin/upp/qun_mod_photo_v2";
            return void 0 !== t.desc && (o.desc = t.desc),
            void 0 !== t.name && (o.title = t.name),
            u.ajax.request({
                type: "post",
                url: e,
                data: o,
                requestType: "formSender",
                charsetType: "UTF8",
                reportRate: 100,
                reportFrom: "viewer2",
                success: function(e) {
                    e && 0 == e.code ? (i.resolve.call(i, e),
                    QZONE.FP.showMsgbox("修改成功！", 4, 2e3)) : (i.reject.call(i, e),
                    QZONE.FP.showMsgbox(e && e.message || "修改失败，请稍后再试", 5, 2e3))
                },
                error: function(e) {
                    QZONE.FP.showMsgbox(e && e.message || "修改失败，请稍后再试", 5, 2e3),
                    i.reject.call(i, e)
                }
            }),
            i.promise()
        }
    }),
    g
}),
define.pack("./comment", ["photo.v7/lib/jquery", "./event", "./tmpl", "./util"], function(require, exports, module) {
    var $ = require("photo.v7/lib/jquery"), event = require("./event"), Tmpl = require("./tmpl"), util = require("./util"), evt = util.evt, monitor, undefined, comment = {};
    function reportUserInfoStr(e) {
        if (window.TCISD && window.TCISD.stringStat) {
            var t = e.points;
            if (t) {
                for (var i = "", o = 0; o < t.length; o++)
                    t[o] == undefined ? i += "0" : i += "1";
                e = slide.photos[slide.index],
                e = ["topicId:", slide.config.comment.getTopicId(e) || "", "user:", QZONE.FP.getQzoneConfig("loginUin"), ";photo key:", e.picKey, ";ua:", navigator.userAgent, ";points:", i].join("");
                TCISD.stringStat(1000100, {
                    bid: 100086,
                    rc: e
                }, {
                    reportRate: 1
                })
            }
        }
    }
    return require.async("app/v8/utils/monitor/1.0", function(e) {
        monitor = e
    }),
    $.extend(comment, {
        init: function() {
            try {
                function parseJSON(data) {
                    if ("string" != typeof data)
                        return !1;
                    try {
                        data = (JSON && JSON.parse || function(_data) {
                            return eval("(" + _data + ")")
                        }
                        )(data.replace(/[\u0000-\u001f]/g, " "))
                    } catch (e) {
                        return !1
                    }
                    return data
                }
                function getNickName(t) {
                    try {
                        var e;
                        return window.external && window.external.CallHummerApi ? 0 == (e = parseJSON(window.external.CallHummerApi("Contact.GetNickName", '{ "uin" : "' + t + '" }'))).errorCode && (e = e.nickName) : e = t,
                        e
                    } catch (e) {
                        return t
                    }
                }
                window.external && window.external.CallHummerApi && (window.ownerProfileSummary = window.ownerProfileSummary || [getNickName(PSY.user.getLoginUin())])
            } catch (e) {}
            this.wrapper = $("#js-comment-ctn").show().css({
                visibility: "hidden"
            }),
            this.moduleCtn = this.wrapper.find("#js-comment-module"),
            this.cmtBtn = $("#js-viewer-comment"),
            this.bind(),
            this.reportRetCode(),
            this.resetCmtHeight(),
            $(".figure-comment").removeClass("js-can-comment")
        },
        bind: function() {
            var o;
            this._hasBindEvent || (this._hasBindEvent = !0,
            o = this,
            event.bind("go", function(e, t) {
                if ("comment" == slide.option.type || slide.config.favMode)
                    return !1;
                if (o.canComment() ? $(".figure-comment").addClass("js-can-comment") : $(".figure-comment").removeClass("js-can-comment"),
                o.refreshCmtNum(0),
                t.first) {
                    if (PSY.loadTimes.firstInitComment = +new Date,
                    "421" == slide.option.appid || "422" == slide.option.appid)
                        try {
                            seajs.use("photo.v7/module/groupPhoto/common/groupFriendSelector", function(e) {
                                var t = slide.option.topicId;
                                e.init({
                                    groupId: slide.option.groupId || t.split("_")[0]
                                })
                            })
                        } catch (e) {
                            window.console && window.console.log(e)
                        }
                    if (window.requirejSolution)
                        try {
                            o.initComment(t)
                        } catch (e) {
                            window.console && window.console.log("initComment err: " + e)
                        }
                } else
                    "comment" != slide.option.type && (o.delayGoTimer && clearTimeout(o.delayGoTimer),
                    o.delayGoTimer = setTimeout(function() {
                        if (window.requirejSolution) {
                            try {
                                o.initComment(t)
                            } catch (e) {
                                window.console && window.console.log("initComment err: " + e)
                            }
                            setTimeout(function() {
                                slide.updateScroll()
                            }, 100)
                        }
                    }, 200))
            }),
            event.bind("onCommentTotalChanged", function(e, t) {
                var i;
                t.hasOwnProperty("total") && (i = t.photo,
                t = t.total,
                i.cmtTotal = t,
                o.refreshCmtNum(i.cmtTotal),
                slide.thumbNail.showCmtNum({
                    photo: i
                }))
            }),
            event.bind("onArrayChanged", function(e, t) {
                var i;
                t.hasOwnProperty("total") && (i = t.photo,
                t = t.total,
                i.cmtTotal = t,
                o.refreshCmtNum(i.cmtTotal),
                slide.thumbNail.showCmtNum({
                    photo: i
                }))
            }),
            event.bind("close", function() {
                o.dispose()
            }),
            event.bind("onReplySuccess", function() {
                util.stat.pingpv("addReplySucc")
            }),
            event.bind("onCommentSuccess", function() {
                util.stat.pingpv("addCmtSucc")
            }),
            event.bind("showSideBarButtons", function() {
                o.wrapper.css({
                    visibility: "visible"
                })
            }),
            event.bind("initListenCmtChange", function() {
                o.listenDomChange()
            }),
            event.bind("afterWindowResize", function() {
                return slide.isOpen() && o.resetCmtHeight(),
                !1
            }),
            event.bind("slideModeChange", function() {
                return o.resetCmtHeight(),
                !1
            }),
            this.cmtBtn.bind(evt.click, function(e) {
                return e.preventDefault(),
                o.goToComment(),
                !1
            }))
        },
        canComment: function() {
            if ("comment" == slide.option.type || slide.config.favMode)
                return !1;
            var e = slide.photos && slide.photos[slide.index];
            return !!("video" != slide.option.type && "videoandrec" != slide.option.type || slide.option.topicId && (!e || e.topicId))
        },
        show: function() {
            this.canComment() && (this.moduleCtn.show(),
            this.commentModule && (this.commentModule.show(),
            $("#js-cmt-poster-wrapper").show()))
        },
        hide: function() {
            this.moduleCtn.hide(),
            this.commentModule && this.commentModule.hide()
        },
        refreshCmtNum: function(e) {
            $("#js-viewer-comment .btn-txt-num").text(0 < e ? "(" + util.formatNum(e) + ")" : "")
        },
        initComment: function(c) {
            var h, u = this, m = c.photo, g = slide.config.comment, f = this.commentModule, v = m.ownerUin == QZONE.FP.getQzoneConfig("loginUin");
            if (u.canComment()) {
                if (u.show(),
                g.hideGift = !0,
                monitor && monitor.UsablityReporter) {
                    h = monitor.UsablityReporter.create({
                        id: 110346
                    });
                    var e = QZFL && QZFL.userAgent;
                    if (e.chrome)
                        h.markAsDoneOnPoint(28);
                    else if (e.firefox)
                        h.markAsDoneOnPoint(29);
                    else if (e.safari)
                        h.markAsDoneOnPoint(29),
                        h.markAsDoneOnPoint(28);
                    else if (e.ie)
                        switch (e.ie) {
                        case 6:
                            h.markAsDoneOnPoint(30);
                            break;
                        case 7:
                            h.markAsDoneOnPoint(30),
                            h.markAsDoneOnPoint(28);
                            break;
                        case 8:
                            h.markAsDoneOnPoint(30),
                            h.markAsDoneOnPoint(29);
                            break;
                        case 9:
                            h.markAsDoneOnPoint(30),
                            h.markAsDoneOnPoint(29),
                            h.markAsDoneOnPoint(28);
                            break;
                        case 10:
                            h.markAsDoneOnPoint(31)
                        }
                } else
                    h = {
                        markAsDoneOnPoint: function() {},
                        reportSuccess: function() {},
                        reportTimeout: function() {}
                    };
                c.first && h.markAsDoneOnPoint(1);
                e = m && m.appid || slide.config.appid;
                4 == e ? h.markAsDoneOnPoint(2) : 311 == e && h.markAsDoneOnPoint(3),
                u.resetCmtAreaStyle(),
                !c.first && f && ((e = f.getDataContext()) && (e.resetComments(),
                e.resetNewComment()),
                f.reset());
                var _ = setTimeout(function() {
                    h.markAsDoneOnPoint(5)
                }, 3e3)
                  , w = setTimeout(function() {
                    h.markAsDoneOnPoint(6)
                }, 5e3)
                  , b = setTimeout(function() {
                    h.markAsDoneOnPoint(7)
                }, 8e3)
                  , y = setTimeout(function() {
                    h.markAsDoneOnPoint(8),
                    h.reportTimeout(),
                    reportUserInfoStr(h)
                }, 1e4);
                this.loadCommentJs().done(function(e, t, i, o, n) {
                    event.trigger("showSideBarButtons"),
                    h.markAsDoneOnPoint(11),
                    clearTimeout(_),
                    clearTimeout(w),
                    clearTimeout(b),
                    clearTimeout(y),
                    c.first && (PSY.loadTimes.firstLoadCommentJs = +new Date);
                    var s = {
                        id: g.getTopicId(m),
                        hostUin: g.getHostUin && g.getHostUin(m) || m.ownerUin,
                        CommentListViewModel: t.CommentListViewModel.derive({
                            properties: {
                                pageNum: {
                                    initialValue: 1
                                },
                                pageSize: {
                                    initialValue: 10
                                }
                            }
                        })
                    };
                    g.cgiIds && (s.cgiIds = g.cgiIds),
                    g.cgiUrls && (s.cgiUrls = g.cgiUrls),
                    g.getCgiUrls && (s.cgiUrls = g.getCgiUrls(m)),
                    g.request && g.request.instance ? s.request = g.request.instance : o && (s.request = o),
                    g.requestStrategy && g.requestStrategy.name ? n && (s.strategy = n) : s.strategy = g.requestStrategy.instance || {
                        isAbleTo: function(e, t) {
                            e = "isAbleTo_" + e;
                            return e in this && this[e](t)
                        },
                        isAbleTo_entopComment: function() {
                            return !1
                        },
                        isAbleTo_entopReply: function() {
                            return !1
                        },
                        isAbleTo_reportComment: function() {
                            return !1
                        },
                        isAbleTo_reportReply: function() {
                            return !1
                        },
                        isAbleTo_postReply: function() {
                            return !0
                        },
                        isAbleTo_removeComment: function(e) {
                            return 421 == slide.config.appid ? window.g_group_isManager || window.g_group_isCreator || QZONE.FP.getQzoneConfig("loginUin") == m.ownerUin : v || e.getByPath("poster.id") == QZONE.FP.getQzoneConfig("loginUin")
                        },
                        isAbleTo_removeReply: function(e) {
                            return 421 == slide.config.appid ? window.g_group_isManager || window.g_group_isCreator || QZONE.FP.getQzoneConfig("loginUin") == m.ownerUin : v || e.getByPath("poster.id") == QZONE.FP.getQzoneConfig("loginUin")
                        }
                    },
                    s.inCharset = "utf-8",
                    s.outCharset = "utf-8",
                    s.referer = g.referer || "qzone",
                    s.poster = t.UserViewModel.create({
                        id: m.ownerUin,
                        name: m.ownerUin
                    }),
                    s.viewModels = {
                        CommentViewModel: t.CommentViewModel.derive({
                            methods: {
                                post_onSuccess: function() {
                                    event.trigger("onCommentSuccess", {
                                        photo: m
                                    })
                                },
                                remove_onSuccess: function() {}
                            }
                        }),
                        ReplyViewModel: t.ReplyViewModel.derive({
                            methods: {
                                post_onSuccess: function() {
                                    event.trigger("onReplySuccess", {
                                        photo: m
                                    })
                                },
                                remove_onSuccess: function() {}
                            }
                        })
                    },
                    0 == m.cmtTotal && (s.comments = []),
                    g.getExtraParams && (p = g.getExtraParams(m),
                    s.extraData = {
                        loadComments: p.loadComments,
                        postComment: p.postComment,
                        postReply: p.postReply,
                        removeComment: p.removeComment,
                        removeReply: p.removeReply
                    }),
                    (c.first || slide.config.moreCommentMode) && (event.trigger("firstCommentModuleReady"),
                    m.comments && m.comments.reverse(),
                    s.CommentListViewModel = t.CommentListViewModel.derive({
                        properties: {
                            pageNum: {
                                initialValue: 0
                            },
                            pageSize: {
                                initialValue: 10
                            },
                            coverPageSize: {
                                initialValue: g.coverPageSize || 10
                            }
                        },
                        methods: {
                            load: function() {
                                if (this.getTopic() && (0 == this.getPageNum() && !u._hasSetSourceDate))
                                    return u._hasSetSourceDate = !0,
                                    m.cmtTotal && !m.comments ? arguments.callee.base.apply(this, arguments) : (this.setSourceData({
                                        total: m.cmtTotal,
                                        comments: m.comments || []
                                    }),
                                    PSY.loadTimes.onCommentRenderReady = +new Date,
                                    void util.stat.speedSend());
                                return arguments.callee.base.apply(this, arguments)
                            }
                        }
                    }));
                    var a = setTimeout(function() {
                        h.markAsDoneOnPoint(15)
                    }, 3e3)
                      , r = setTimeout(function() {
                        h.markAsDoneOnPoint(16)
                    }, 5e3)
                      , d = setTimeout(function() {
                        h.markAsDoneOnPoint(17)
                    }, 8e3)
                      , l = setTimeout(function() {
                        h.markAsDoneOnPoint(18),
                        h.reportTimeout()
                    }, 1e4)
                      , n = function(e) {
                        return e.is_weixin_mode
                    }
                      , p = g.checkNeedPrivateComment ? g.checkNeedPrivateComment(m) : g.needPrivateComment;
                    f && p != f.getConfig().needPrivateComment && (u.uninitComment(),
                    f = null),
                    f ? (f.setConfig({
                        appid: m && m.appid || slide.config.appid,
                        needInsertImg: slide.config.needInsertImg ? 1 : 0,
                        needPrivateComment: p,
                        commentBoxConfig: {
                            showPresentInserter: !g.hideGift,
                            needPrivateComment: p
                        },
                        commentListConfig: {
                            itemConfig: {
                                replyBoxConfig: {
                                    showPresentInserter: !g.hideGift
                                }
                            },
                            showAllLinkConfig: {
                                hideAllLink: n(m)
                            }
                        }
                    }),
                    f.setDataContext(viewModel = t.create(s))) : (viewModel = t.create(s),
                    (f = e.create({
                        dataContext: viewModel,
                        template: i.getInstance(),
                        config: {
                            appid: m && m.appid || slide.config.appid,
                            needInsertImg: slide.config.needInsertImg ? 1 : 0,
                            needPrivateComment: p,
                            referer: "photo_viewer",
                            commentBoxConfig: {
                                contentMaxLength: 500,
                                autoOpen: !0,
                                mentionSensible: !g.hideAt,
                                mentionSupported: !g.hideAt,
                                showMentionInserter: !g.hideAt,
                                showPresentInserter: !g.hideGift,
                                needPrivateComment: p
                            },
                            commentListConfig: {
                                itemConfig: {
                                    replySupported: !g.replyAsAt,
                                    replyBoxConfig: {
                                        contentMaxLength: g.contentLength || 500,
                                        showPresentInserter: !g.hideGift
                                    }
                                },
                                showAllLinkConfig: {
                                    hideAllLink: n(m)
                                }
                            }
                        }
                    })) && h.markAsDoneOnPoint(21)),
                    f.addListener("onEntirelyRendered", function(e) {
                        f.removeListener("onEntirelyRendered", arguments.callee),
                        h.markAsDoneOnPoint(22),
                        h.reportSuccess({
                            reportRate: 100
                        }),
                        clearTimeout(a),
                        clearTimeout(r),
                        clearTimeout(d),
                        clearTimeout(l)
                    }),
                    u.commentModule = f,
                    viewModel.getComments().addListener("onTotalChanged", function(e, t) {
                        event.trigger("onCommentTotalChanged", {
                            photo: m,
                            total: t
                        })
                    }),
                    viewModel.getComments().addListener("onArrayChanged", function(e) {
                        event.trigger("onArrayChanged", {
                            photo: m
                        })
                    }),
                    $("#js-sidebar-ctn").css("overflow", "hidden"),
                    u._cmtHasRenderred || (u._cmtHasRenderred = !0,
                    f.renderIn(u.moduleCtn[0]),
                    setTimeout(function() {
                        u.bindHeightChangeEvent(f)
                    }, 0)),
                    "comment" == slide.option.type && setTimeout(function() {
                        u.hideCommentBox()
                    }, 20)
                })
            } else
                u.hide()
        },
        uninitComment: function() {
            var e;
            this.commentModule && ((e = this.commentModule.getDataContext()) && (e.resetComments(),
            e.resetNewComment()),
            this.commentModule.reset(),
            this.commentModule = null,
            this.moduleCtn.html(""),
            $("#js-sidebar-ctn .figure-side-wrap .figure-comment").html(""),
            this._cmtHasRenderred = !1)
        },
        loadCommentJs: function() {
            var e = slide.config.comment
              , t = ["/controls/commentModule:3.0:prototype", "/controls/commentModule/viewModel:3.0_common:prototype", "/controls/commentModule/template:3.0_next:prototype"]
              , s = $.Deferred();
            return e.request && e.request.name && t.push("/requests/" + e.request.name + ":" + e.request.version + ":prototype"),
            e.requestStrategy && e.requestStrategy.name && t.push("/strategies/" + e.requestStrategy.name + ":" + e.requestStrategy.version + ":prototype"),
            jSolution("1.0", function(e) {
                e.load({
                    ids: t,
                    onSuccess: function(e, t, i, o, n) {
                        s.resolve.call(s, e, t, i, o, n)
                    }
                })
            }),
            s.promise()
        },
        render: function(e) {},
        initScrollBar: function(e) {
            var t = $("#js-cmt-wrap");
            t.hasClass("js-scrollbox") ? slide.updateScroll() : (t.addClass("js-scrollbox").addClass("js-slideview-scrollbox"),
            t.find(".figure-side-inner").addClass("js-scrollcont").attr("id", "js-viewer-scrollcont"),
            0 == t.find(".js-scrollbar").length && t.prepend(Tmpl.scrollBar()),
            seajs.use("photo.v7/common/scrollBox/index", function(e) {
                e.get("./scroll")({
                    boxDiv: t[0]
                })
            }))
        },
        resetCmtAreaStyle: function(e) {
            $("#js-cmt-wrap").attr("style", ""),
            $("#js-cmt-wrap").attr("style", "").removeClass("js-scrollbox"),
            $("#js-cmt-wrap .js-scrollcont").removeClass("js-scrollcont"),
            QZFL && QZFL.userAgent && QZFL.userAgent.ie6 && ($("#js-cmt-wrap").attr("style", "").removeClass("js-scrollbox"),
            $("#js-cmt-wrap .js-scrollcont").removeClass("js-scrollcont")),
            !ua || !ua.ie || 7 != document.documentMode && document.documentMode || ($("#js-cmt-wrap").attr("style", "").removeClass("js-scrollbox"),
            $("#js-cmt-wrap .js-scrollcont").removeClass("js-scrollcont"))
        },
        bindHeightChangeEvent: function(e) {
            var t, i = this;
            i.commentModule && i.commentModule == e && (t = $("#js-sidebar-ctn .mod_comment_poster_wrapper").attr("id", "js-cmt-poster-wrapper"),
            e.addListener("onEntirelyRendered", function(e) {
                var t = $("#js-sidebar-ctn .mod_comment_poster_wrapper");
                t.length && !t.attr("id") && t.attr("id", "js-cmt-poster-wrapper")
            }),
            e.addListener("onReflow", function() {
                i.resetCmtHeight(),
                $("#js-sidebar-ctn").trigger("updateScroll")
            }),
            $("#js-sidebar-ctn .figure-side-wrap .figure-comment").append(t),
            i.resetCmtHeight({
                first: !0
            }))
        },
        resetCmtHeight: function(e) {
            var r = this;
            e && e.inputDom || $("#js-sidebar-ctn .mod_comment_poster_wrapper .textinput:first");
            clearTimeout(slide._timer);
            var d = $("#js-cmt-wrap");
            $("#js-sidebar-ctn").css("overflow", "hidden"),
            slide._timer = setTimeout(function() {
                var e, t, i, o, n, s, a = $("#js-cmt-poster-wrapper");
                a.length && a.children().length && (e = $("#js-sidebar-ctn .figure-side-wrap"),
                t = $("#js-sidebar-ctn").height(),
                e.find(".js-userinfo-ctn").position().top,
                i = e.find(".comments_list>ul:last"),
                a.height() || a.children().is(":visible") ? (o = 0,
                i.length && i.children().length ? (o = i.position().top + i.height(),
                (n = $("#js-cmt-wrap #js-viewer-scrollcont")[0]) && (o += n.scrollTop)) : $("#js-expandDesc") && "none" == $("#js-expandDesc").css("display") && (o = (i = e.find("#js-description-inner")).height()),
                s = $("#js-sidebar-ctn .figure-side-ft").position().top,
                a.position().top,
                o + a.height() + 80 > s ? ($("#js-sidebar-ctn .figure-side-wrap").addClass("figure-side-scroll"),
                d.height(t - 120),
                r.initScrollBar({
                    isReply: !1
                })) : (r.resetCmtAreaStyle(),
                $("#js-sidebar-ctn .figure-side-wrap").removeClass("figure-side-scroll"))) : (o = 0,
                i.length && i.children().length && (o = i.position().top + i.height(),
                (n = $("#js-cmt-wrap #js-viewer-scrollcont")[0]) && (o += n.scrollTop)),
                s = $("#js-sidebar-ctn .figure-side-ft").position().top,
                a.position().top,
                s < o + 20 ? (QZFL && QZFL.userAgent && QZFL.userAgent.ie6 ? d.height(t - 100) : d.height(t - 80),
                r.initScrollBar({
                    isReply: !0
                })) : (r.resetCmtAreaStyle(),
                $("#js-sidebar-ctn .figure-side-wrap").removeClass("figure-side-scroll"))),
                slide.updateScroll(),
                $("#js-sidebar-ctn").css("overflow", ""))
            }, 0)
        },
        goToComment: function() {
            $("#js-mod-retweet").html("").hide(),
            this.moduleCtn.hide();
            try {
                slide.rtBox.dispose(),
                $("#_slideView_figure_content").scrollTop($("#_slideView_figure_content")[0].scrollHeight)
            } catch (e) {
                slide.updateScroll()
            }
            this.canComment() && (this.commentModule.show(),
            this.commentModule.showCommentBox(),
            this.moduleCtn.show(),
            $("#js-cmt-poster-wrapper").show()),
            window.hasCmtreply && $("#j-comment-tab").css("display", "block")
        },
        hideCommentBox: function() {
            $("#js-sidebar-ctn .mod_comment_poster_wrapper").hide()
        },
        reportRetCode: function() {
            setTimeout(function() {
                var e, t;
                0 == $("#js-comment-module .mod_commnets_poster").length ? (e = -1,
                (t = QZFL && QZFL.userAgent) && (t.chrome ? e = -2 : t.ie10 ? e = -3 : t.ie9 ? e = -4 : t.ie8 ? e = -5 : t.ie7 ? e = -6 : t.ie6 ? e = -7 : t.firefox ? e = -8 : t.safari ? e = -9 : t.opera && (e = -10)),
                util.stat.returnCode({
                    flag1: 110345,
                    code: e
                })) : util.stat.returnCode({
                    flag1: 110345,
                    code: 0
                })
            }, 1e4)
        },
        dispose: function() {
            try {
                this.uninitComment(),
                slide._isReplying = 0,
                clearInterval(slide._interval),
                this.cmtBtn.hide()
            } catch (e) {
                slide._isReplying = 0,
                clearInterval(slide._interval)
            }
            $(".js-info-separator").hide(),
            this._hasSetSourceDate = !1
        }
    }),
    comment
}),
define.pack("./config", ["photo.v7/lib/jquery", "./configs.default", "./configs.4", "./configs.311", "./configs.202", "./configs.421", "./configs.907", "./configs.4.comment", "./configs.311.comment", "./configs.4.iphoto", "./configs.311.iphoto", "./configs.311.video", "./configs.4.videoandrec", "./configs.311.videoandrec", "./configs.202.videoandrec", "./configs.202.album", "./configs.202.photo"], function(e, exports, module) {
    var t = e("photo.v7/lib/jquery")
      , i = e("./configs.default")
      , o = {
        limit: 0
    }
      , n = e("./configs.4");
    o[4] = t.extend({}, i, n);
    n = e("./configs.311");
    o[311] = t.extend({}, i, n);
    n = e("./configs.202");
    o[202] = t.extend({}, i, n);
    n = e("./configs.421");
    o[421] = t.extend({}, i, n),
    o[422] = o[421];
    n = e("./configs.907");
    o[907] = t.extend({}, i, n);
    n = e("./configs.4.comment");
    o["4-comment"] = t.extend({}, i, n);
    n = e("./configs.311.comment");
    o["311-comment"] = t.extend({}, i, n);
    n = e("./configs.4.iphoto");
    o["4-iphoto"] = t.extend({}, i, n);
    n = e("./configs.311.iphoto");
    o["311-iphoto"] = t.extend({}, i, n);
    n = e("./configs.311.video");
    o["311-video"] = t.extend({}, i, n);
    n = e("./configs.4.videoandrec");
    o["4-videoandrec"] = t.extend({}, i, n);
    n = e("./configs.311.videoandrec");
    o["311-videoandrec"] = t.extend({}, i, n);
    n = e("./configs.202.videoandrec");
    o["202-videoandrec"] = t.extend({}, i, n);
    n = e("./configs.202.album");
    o["202-album"] = t.extend({}, i, n);
    e = e("./configs.202.photo");
    return o["202-photo"] = t.extend({}, i, e),
    o["311-beforeyear"] = t.extend(!0, {}, o[907]),
    o["4-beforeyear"] = t.extend(!0, {}, o[907]),
    o[2] = t.extend(!0, {}, o[907]),
    o["2-comment"] = t.extend(!0, {}, o[907]),
    o["202-comment"] = t.extend(!0, {}, o[907]),
    o["4-reply"] = t.extend(!0, {}, o[907]),
    o["311-reply"] = t.extend(!0, {}, o[907]),
    o["2-reply"] = t.extend(!0, {}, o[907]),
    o["202-reply"] = t.extend(!0, {}, o[907]),
    o
}),
define.pack("./configs.0.videoandrec", ["photo.v7/lib/jquery"], function(e, exports, module) {
    var t = e("photo.v7/lib/jquery")
      , e = {
        cgi: {
            getPhotos: "",
            type: "videoandrec"
        },
        thumbNail: {
            pageSize: 9,
            areaTitle: "推荐视频",
            maxThumbNailWidth: 1155,
            imgGapWidth: 10,
            arrowWidth: 47,
            imgWidth: 240,
            imgHeight: 134,
            selectClass: "on playing",
            hoverClass: "hover"
        },
        viewer: {
            maxViewerWidth: 1280,
            maxViewerHeight: 720,
            minViewerWidth: 640,
            minFullViewerWidth: 640,
            minViewerHeight: 360,
            topGap: 16,
            bottomGap: 16,
            fullBottomGap: 183,
            leftGap: 20,
            rightGap: 20,
            adBoxHeight: 150,
            hideRotate: !0,
            hideFigureHandle: !0,
            hideFigureArea: !0
        },
        sideBar: {
            width: 380
        },
        showBtnTxt: 2,
        info: {
            tmplName: function(e) {
                return "info_" + e.appid
            },
            getDisplayTimeStr: function(e) {
                return slide.util.formatTime2(e.uploadTime)
            }
        },
        getFakeFirstData: function() {
            var e = slide.option.videoInfo;
            if (e) {
                e = {
                    isFakeFirstData: !0,
                    ownerUin: e.origUin || e.ownerUin,
                    ownerName: e.origUin ? e.origName : e.ownerName,
                    appid: e.appid,
                    tid: "",
                    videoId: e.videoId,
                    videoIdForFilter: e.videoIdForRec || e.videoId,
                    videoSrc: e.videoSrc,
                    videoWidth: e.videoWidth,
                    videoHeight: e.videoHeight,
                    videoTitle: e.videoTitle,
                    videoDesc: e.videoDesc,
                    videoType: e.videoType,
                    videoCover: e.videoCover,
                    videoDuration: e.videoDuration,
                    videoExtend: e.videoExtend
                };
                return e.beginTime = slide.option.beginTime || 0,
                slide.util.processSingleVideoRecData(e),
                e
            }
        },
        updateOffset: function(e) {
            return slide.photos.length
        },
        getExtraPageParam: function(e) {
            return {}
        },
        getLikeKey: function(e) {
            if (e.likeKeys && e.likeKeys.curKey)
                return {
                    uniKey: e.likeKeys.curKey,
                    curKey: e.likeKeys.curKey
                };
            var t, i;
            if (e.ownerUin && e.appid && e.tid && (4 == e.appid ? t = i = "http://user.qzone.qq.com/" + e.ownerUin + "/photo/" + e.tid + "/" + e.subid : 311 == e.appid ? t = i = "http://user.qzone.qq.com/" + e.ownerUin + "/mood/" + e.tid : 202 == e.appid && (t = i = (flag + parseInt(e.ownerUin) + "").slice(1) + (flag + ~~e.tid + "").slice(1)),
            i))
                return {
                    uniKey: t,
                    curKey: i
                };
            return null
        },
        comment: {
            checkNeedPrivateComment: function(e) {
                e = 4 == e.appid ? e.videoExtend && e.videoExtend.isShareAlbum ? 0 : 1 : 311 == e.appid ? 1 : 0;
                return e
            },
            getTopicId: function(e) {
                return 4 == e.appid ? e.ownerUin && e.tid ? [e.tid, e.subid || ""].join("_") : "" : e.ownerUin && e.tid ? [e.ownerUin, e.tid, e.subid || ""].join("_") : ""
            },
            getExtraParams: function(e) {
                var t;
                return 4 == e.appid ? {
                    loadComments: t = {
                        need_private_comment: 1,
                        albumId: e.tid,
                        qzone: "qzone",
                        plat: "qzone"
                    },
                    postComment: t,
                    postReply: t,
                    removeComment: {},
                    removeReply: {}
                } : 311 == e.appid ? {
                    loadComments: t = {
                        need_private_comment: 1
                    },
                    postComment: t,
                    postReply: t,
                    removeComment: {},
                    removeReply: {}
                } : {
                    loadComments: {},
                    postComment: {},
                    postReply: {},
                    removeComment: {},
                    removeReply: {}
                }
            },
            getCgiUrls: function(e) {
                var t;
                return 4 == e.appid ? t = window.g_qzonetoken ? {
                    loadComments: "http://app.photo.qzone.qq.com/cgi-bin/app/cgi_pcomment_xml_v2",
                    postComment: "http://photo.qzone.qq.com/cgi-bin/common/cgi_add_piccomment_v2?qzonetoken=" + window.g_qzonetoken,
                    removeComment: "http://photo.qzone.qq.com/cgi-bin/common/cgi_del_piccomment_v2?qzonetoken=" + window.g_qzonetoken,
                    postReply: "http://photo.qzone.qq.com/cgi-bin/common/cgi_add_reply_v2?qzonetoken=" + window.g_qzonetoken,
                    removeReply: "http://photo.qzone.qq.com/cgi-bin/common/cgi_del_reply_v2?qzonetoken=" + window.g_qzonetoken
                } : {
                    loadComments: "http://app.photo.qzone.qq.com/cgi-bin/app/cgi_pcomment_xml_v2",
                    postComment: "http://photo.qzone.qq.com/cgi-bin/common/cgi_add_piccomment_v2",
                    removeComment: "http://photo.qzone.qq.com/cgi-bin/common/cgi_del_piccomment_v2",
                    postReply: "http://photo.qzone.qq.com/cgi-bin/common/cgi_add_reply_v2",
                    removeReply: "http://photo.qzone.qq.com/cgi-bin/common/cgi_del_reply_v2"
                } : 311 == e.appid ? t = window.g_qzonetoken ? {
                    loadComments: "http://taotao.qzone.qq.com/cgi-bin/emotion_cgi_getcmtreply_v6",
                    postComment: "http://taotao.qzone.qq.com/cgi-bin/emotion_cgi_addcomment_ugc?qzonetoken=" + window.g_qzonetoken,
                    removeComment: "http://taotao.qq.com/cgi-bin/emotion_cgi_delcomment_ugc?qzonetoken=" + window.g_qzonetoken,
                    postReply: "http://taotao.qzone.qq.com/cgi-bin/emotion_cgi_addreply_ugc?qzonetoken=" + window.g_qzonetoken,
                    removeReply: "http://taotao.qq.com/cgi-bin/emotion_cgi_delreply_ugc?qzonetoken=" + window.g_qzonetoken
                } : {
                    loadComments: "http://taotao.qzone.qq.com/cgi-bin/emotion_cgi_getcmtreply_v6",
                    postComment: "http://taotao.qzone.qq.com/cgi-bin/emotion_cgi_addcomment_ugc",
                    removeComment: "http://taotao.qq.com/cgi-bin/emotion_cgi_delcomment_ugc",
                    postReply: "http://taotao.qzone.qq.com/cgi-bin/emotion_cgi_addreply_ugc",
                    removeReply: "http://taotao.qq.com/cgi-bin/emotion_cgi_delreply_ugc"
                } : 202 == e.appid && (t = {
                    loadComments: window.location.protocol + "//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshareget_comment?fupdate=2",
                    postComment: window.location.protocol + "//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshareaddcomment?fupdate=2",
                    removeComment: window.location.protocol + "//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzsharedeletecomment?fupdate=2",
                    postReply: window.location.protocol + "//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshareaddcomment?fupdate=2",
                    removeReply: window.location.protocol + "//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzsharedeletecomment?fupdate=2"
                }),
                t
            }
        },
        retweet: {
            getRetweetData: function(e) {
                var t = e.appid || slide.option.appid
                  , i = ""
                  , o = null;
                return 4 == t ? (i = "picture",
                e.videoExtend && e.videoExtend.shareH5 && (o = {
                    videoh5url: e.videoExtend.shareH5
                })) : 202 == t && (i = "share"),
                {
                    appid: t,
                    type: i,
                    uin: e.ownerUin,
                    tid: 4 == t && e.subid ? e.tid + ":" + e.subid : e.tid,
                    content: e.desc,
                    extendData: o
                }
            }
        }
    };
    return e.plugins = [{
        id: "video",
        name: "视频",
        uri: "./plugins.video",
        enable: function(e) {
            return !0
        }
    }, {
        id: "retweet",
        name: "转发",
        uri: "./plugins.retweet"
    }, {
        id: "collect",
        name: "收藏",
        uri: "./plugins.collect",
        enable: function(e) {
            return !0
        }
    }, {
        id: "moreOper",
        name: "更多",
        uri: "./plugins.moreOper",
        enable: function(e) {
            return t("#js-other-menu ul li").hide(),
            t("#js-btn-collect-li").show(),
            !0
        }
    }],
    e
}),
define.pack("./configs.202.album", ["photo.v7/lib/jquery", "./configs.202"], function(e, exports, module) {
    var t = e("photo.v7/lib/jquery")
      , e = e("./configs.202")
      , e = t.extend(!0, {}, e, {
        cgi: {
            getPhotos: "http://plist.photo.qq.com/fcgi-bin/cgi_floatview_photo_list_v2",
            type: "album"
        },
        thumbNail: {
            pageSize: 19,
            areaTitle: "",
            maxThumbNailWidth: 1155,
            imgGapWidth: 5,
            arrowWidth: 30,
            imgWidth: 50,
            imgHeight: 50,
            selectClass: "on",
            hoverClass: "",
            hideCmt: !0
        },
        info: {
            tmplName: "info_202",
            getDisplayTimeStr: function(e) {
                return ""
            }
        },
        updateOffset: function(e) {
            return slide.photos.length
        },
        getExtraPageParam: function(e) {
            var t = slide.option.shareParam;
            return t && t.albumInfo && {
                appid: 4,
                hostUin: t.albumInfo.ownerUin,
                topicId: t.albumInfo.albumId,
                picKey: slide.option.picKey,
                cmtNum: 0,
                likeNum: 0,
                number: 1
            }
        },
        getLikeKey: function(e) {
            var t = slide.shareInfo;
            return {
                uniKey: slide.shareInfo.Url,
                curKey: (1e12 + parseInt(t.shareUser.uin) + "").slice(1) + (1e12 + ~~t.ItemID + "").slice(1)
            }
        },
        comment: {
            getHostUin: function(e) {
                return slide.shareInfo.shareUser.uin
            },
            getTopicId: function(e) {
                var t = slide.shareInfo;
                return t.shareUser.uin + "_" + t.ItemID + "_" + e.imageKey
            },
            getCgiUrls: function(e) {
                return {
                    loadComments: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshareget_comment?fupdate=2",
                    postComment: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshareaddcomment?fupdate=2",
                    removeComment: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzsharedeletecomment?fupdate=2",
                    postReply: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshareaddcomment?fupdate=2",
                    removeReply: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzsharedeletecomment?fupdate=2"
                }
            }
        },
        retweet: {
            getRetweetData: function(e) {
                var t = slide.shareInfo;
                return {
                    appid: slide.option.appid,
                    uin: t.shareUser.uin,
                    tid: t.ItemID,
                    content: t.Description
                }
            }
        }
    });
    return e.plugins = [{
        id: "video",
        name: "视频",
        uri: "./plugins.video",
        enable: function(e) {
            return !0
        }
    }, {
        id: "retweet",
        name: "转发",
        uri: "./plugins.retweet"
    }, {
        id: "moreOper",
        name: "更多",
        uri: "./plugins.moreOper",
        enable: function(e) {
            return t("#js-other-menu ul li").hide(),
            !0
        }
    }],
    e
}),
define.pack("./configs.202", ["photo.v7/lib/jquery"], function(require, exports, module) {
    require("photo.v7/lib/jquery");
    return {
        updateOffset: function(e) {
            return slide.photos.length
        },
        cgi: {
            getPhotos: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshareget_images"
        },
        stat: {
            speedFlag: "177-11-53",
            returnCode: 110280
        },
        info: {
            tmplName: "info_202",
            getDisplayTimeStr: function(e) {
                return slide.util.formatTime2(e.uploadTime)
            }
        },
        getLikeKey: function(e) {
            var t = (1e12 + parseInt(e.ownerUin) + "").slice(1) + (1e12 + ~~e.albumId + "").slice(1);
            return {
                uniKey: e.shareLink,
                curKey: t
            }
        },
        comment: {
            getHostUin: function(e) {
                return e.shareUin
            },
            getTopicId: function(e) {
                return e.shareUin + "_" + e.shareId + "_" + e.url
            },
            getExtraParams: function(e) {
                return {
                    loadComments: {},
                    postComment: {},
                    postReply: {},
                    removeComment: {},
                    removeReply: {}
                }
            },
            getCgiUrls: function() {
                return {
                    loadComments: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshareget_comment?fupdate=2",
                    postComment: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshareaddcomment?fupdate=2",
                    removeComment: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzsharedeletecomment?fupdate=2",
                    postReply: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshareaddcomment?fupdate=2",
                    removeReply: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzsharedeletecomment?fupdate=2"
                }
            },
            requestStrategy: {}
        }
    }
}),
define.pack("./configs.202.photo", ["photo.v7/lib/jquery", "./configs.202"], function(e, exports, module) {
    var t = e("photo.v7/lib/jquery")
      , e = e("./configs.202")
      , e = t.extend(!0, {}, e, {
        cgi: {
            getPhotos: "http://plist.photo.qq.com/fcgi-bin/cgi_floatview_photo_list_v2",
            type: "photo"
        },
        thumbNail: {
            pageSize: 19,
            areaTitle: "",
            maxThumbNailWidth: 1155,
            imgGapWidth: 5,
            arrowWidth: 30,
            imgWidth: 50,
            imgHeight: 50,
            selectClass: "on",
            hoverClass: "",
            hideCmt: !0
        },
        info: {
            tmplName: "info_202",
            getDisplayTimeStr: function(e) {
                return ""
            }
        },
        updateOffset: function(e) {
            return slide.photos.length
        },
        getExtraPageParam: function(e) {
            var t = slide.option.shareParam;
            return t && t.albumInfo && {
                appid: 4,
                hostUin: t.albumInfo.ownerUin,
                topicId: t.albumInfo.albumId,
                picKey: slide.option.picKey,
                cmtNum: 0,
                likeNum: 0,
                number: 1
            }
        },
        getLikeKey: function(e) {
            var t = slide.shareInfo;
            return {
                uniKey: slide.shareInfo.Url,
                curKey: (1e12 + parseInt(t.shareUser.uin) + "").slice(1) + (1e12 + ~~t.ItemID + "").slice(1)
            }
        },
        comment: {
            getHostUin: function(e) {
                return slide.shareInfo.shareUser.uin
            },
            getTopicId: function(e) {
                var t = slide.shareInfo;
                return t.shareUser.uin + "_" + t.ItemID + "_" + e.imageKey
            },
            getCgiUrls: function(e) {
                return {
                    loadComments: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshareget_comment?fupdate=2",
                    postComment: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshareaddcomment?fupdate=2",
                    removeComment: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzsharedeletecomment?fupdate=2",
                    postReply: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshareaddcomment?fupdate=2",
                    removeReply: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzsharedeletecomment?fupdate=2"
                }
            }
        },
        retweet: {
            getRetweetData: function(e) {
                var t = slide.shareInfo;
                return {
                    appid: slide.option.appid,
                    uin: t.shareUser.uin,
                    tid: t.ItemID,
                    content: t.Description
                }
            }
        }
    });
    return e.plugins = [{
        id: "video",
        name: "视频",
        uri: "./plugins.video",
        enable: function(e) {
            return !0
        }
    }, {
        id: "retweet",
        name: "转发",
        uri: "./plugins.retweet"
    }, {
        id: "moreOper",
        name: "更多",
        uri: "./plugins.moreOper",
        enable: function(e) {
            return t("#js-other-menu ul li").hide(),
            !0
        }
    }],
    e
}),
define.pack("./configs.202.videoandrec", ["photo.v7/lib/jquery", "./configs.202", "./configs.0.videoandrec"], function(e, exports, module) {
    var t = e("photo.v7/lib/jquery")
      , i = e("./configs.202")
      , e = e("./configs.0.videoandrec")
      , i = t.extend(!0, {}, i, e);
    return i.plugins = e.plugins,
    i
}),
define.pack("./configs.311.comment", ["photo.v7/lib/jquery", "./configs.311"], function(e, exports, module) {
    var t = e("photo.v7/lib/jquery")
      , e = e("./configs.311")
      , e = t.extend(!0, {}, e, {
        cgi: {
            getPhotos: "http://taotao.qq.com/cgi-bin/emotion_cgi_getcmtdetail_v6",
            type: "comment"
        },
        comment: {
            getTopicId: function(e) {
                return slide.option.topicId
            },
            getCgiUrls: function() {
                return window.g_qzonetoken ? {
                    loadComments: "http://taotao.qzone.qq.com/cgi-bin/emotion_cgi_getcmtdetail_v6",
                    postComment: "http://taotao.qzone.qq.com/cgi-bin/emotion_cgi_addreply_ugc?qzonetoken=" + window.g_qzonetoken,
                    removeComment: "http://taotao.qq.com/cgi-bin/emotion_cgi_delreply_ugc?qzonetoken=" + window.g_qzonetoken,
                    postReply: "http://taotao.qzone.qq.com/cgi-bin/emotion_cgi_addreply_ugc?qzonetoken=" + window.g_qzonetoken,
                    removeReply: "http://taotao.qq.com/cgi-bin/emotion_cgi_delreply_ugc?qzonetoken=" + window.g_qzonetoken
                } : {
                    loadComments: "http://taotao.qzone.qq.com/cgi-bin/emotion_cgi_getcmtdetail_v6",
                    postComment: "http://taotao.qzone.qq.com/cgi-bin/emotion_cgi_addreply_ugc",
                    removeComment: "http://taotao.qq.com/cgi-bin/emotion_cgi_delreply_ugc",
                    postReply: "http://taotao.qzone.qq.com/cgi-bin/emotion_cgi_addreply_ugc",
                    removeReply: "http://taotao.qq.com/cgi-bin/emotion_cgi_delreply_ugc"
                }
            }
        }
    });
    return e.plugins = [{
        id: "moreOper",
        name: "更多",
        uri: "./plugins.moreOper",
        enable: function(e) {
            return t("#js-btn-downloadPhoto").parent().hide(),
            t("#js-btn-moreOper").show(),
            2 == PSY.helper.getImageInfoByUrl(e.originUrl).type ? t("#js-btn-rotateRight").hide() : t("#js-btn-rotateRight").show(),
            t("#js-btn-meituxiuxiu").parent().hide(),
            t("#js-btn-copyAddress").parent().hide(),
            t("#js-btn-delPhoto").parent().hide(),
            t("#js-btn-movePhoto").parent().hide(),
            t("#js-btn-sharePhoto").parent().hide(),
            !0
        }
    }],
    e
}),
define.pack("./configs.311.iphoto", ["photo.v7/lib/jquery", "./configs.311"], function(e, exports, module) {
    var t = e("photo.v7/lib/jquery")
      , e = e("./configs.311");
    return t.extend(!0, {}, e, {
        supportPrevFetch: !0,
        cgi: {
            getPhotos: "http://shplist.photo.qq.com/fcgi-bin/cgi_photo_flow_floatview_list",
            queryList: ""
        },
        thumbNail: {
            pageSize: 19,
            areaTitle: "",
            maxThumbNailWidth: 1155,
            imgGapWidth: 5,
            arrowWidth: 30,
            imgWidth: 50,
            imgHeight: 50,
            selectClass: "on",
            hoverClass: "",
            hideCmt: !0
        },
        updateOffset: function(e) {
            return slide.photos.length
        },
        comment: {
            getTopicId: function(e) {
                return e.ownerUin + "_" + e.ugcTypeId + "_," + e.albumId + "," + e.lloc
            }
        },
        getExtraPageParam: function(e) {
            var t = {}
              , i = slide.photos[slide.photos.length - 1]
              , o = slide.photos[0]
              , e = e || {};
            return t.sortOrder = slide.option.sortOrder || 3,
            t.showMode = 1,
            t.need_private_comment = 1,
            0 == slide.offset ? (e.hasOwnProperty("prevNum") ? t.prevNum = e.prevNum : t.prevNum = 9,
            e.hasOwnProperty("postNum") ? t.postNum = e.postNum : e.first ? t.postNum = 18 : t.postNum = 0) : (t.picKey = e.picKey || i.picKey,
            t.shootTime = i.shootTime,
            e.getPrevPhoto && (t.picKey = o.picKey,
            t.shootTime = o.shootTime),
            e.hasOwnProperty("prevNum") ? t.prevNum = e.prevNum : t.prevNum = 0,
            e.hasOwnProperty("postNum") ? t.postNum = e.postNum : t.postNum = 20),
            t
        }
    })
}),
define.pack("./configs.311", ["photo.v7/lib/jquery"], function(require, exports, module) {
    var i = require("photo.v7/lib/jquery");
    return {
        number: 40,
        getListAfterFirst: !1,
        enableWebpFlash: function() {
            return !1
        },
        updateOffset: function(e) {
            return e && e.first ? 0 : slide.offset + this.number
        },
        getExtraPageParam: function(e) {
            var t = {};
            return t.need_private_comment = 1,
            t
        },
        cgi: {
            getPhotos: "http://plist.photo.qq.com/fcgi-bin/cgi_floatview_photo_list_v2",
            queryList: "http://sh.taotao.qq.com/cgi-bin/emotion_cgi_photolayer_info"
        },
        stat: {
            speedFlag: "177-11-58",
            returnCode: 110328
        },
        info: {
            tmplName: "info_311",
            getDisplayTimeStr: function(e) {
                return slide.util.formatTime2(slide.util.getNewDate(e.createTime))
            }
        },
        getLikeKey: function(e) {
            return {
                uniKey: e.likeKey,
                curKey: e.likeKey
            }
        },
        getDescHtml: function(e) {},
        comment: {
            needPrivateComment: 1,
            coverPageSize: 10,
            getTopicId: function(e) {
                return e.ownerUin + "_" + e.tid + "_" + e.picId
            },
            getExtraParams: function(e) {
                var t = {
                    need_private_comment: 1
                };
                return {
                    loadComments: t,
                    postComment: t,
                    postReply: t,
                    removeComment: {},
                    removeReply: {}
                }
            },
            getCgiUrls: function() {
                return window.g_qzonetoken ? {
                    loadComments: "http://taotao.qzone.qq.com/cgi-bin/emotion_cgi_getcmtreply_v6",
                    postComment: "http://taotao.qzone.qq.com/cgi-bin/emotion_cgi_addcomment_ugc?qzonetoken=" + window.g_qzonetoken,
                    removeComment: "http://taotao.qq.com/cgi-bin/emotion_cgi_delcomment_ugc?qzonetoken=" + window.g_qzonetoken,
                    postReply: "http://taotao.qzone.qq.com/cgi-bin/emotion_cgi_addreply_ugc?qzonetoken=" + window.g_qzonetoken,
                    removeReply: "http://taotao.qq.com/cgi-bin/emotion_cgi_delreply_ugc?qzonetoken=" + window.g_qzonetoken
                } : {
                    loadComments: "http://taotao.qzone.qq.com/cgi-bin/emotion_cgi_getcmtreply_v6",
                    postComment: "http://taotao.qzone.qq.com/cgi-bin/emotion_cgi_addcomment_ugc",
                    removeComment: "http://taotao.qq.com/cgi-bin/emotion_cgi_delcomment_ugc",
                    postReply: "http://taotao.qzone.qq.com/cgi-bin/emotion_cgi_addreply_ugc",
                    removeReply: "http://taotao.qq.com/cgi-bin/emotion_cgi_delreply_ugc"
                }
            },
            viewModelTag: "common",
            request: {
                name: "moodRequest",
                version: "3.0"
            },
            requestStrategy: {
                name: "moodRequestStrategy",
                version: "3.1"
            }
        },
        plugins: [{
            id: "retweet",
            name: "转发",
            uri: "./plugins.retweet"
        }, {
            id: "music",
            name: "语音",
            uri: "./plugins.music",
            enable: function(e) {
                return !(window.inqq || e && e.inqq)
            }
        }, {
            id: "lbs",
            name: "lbs",
            uri: "./plugins.lbs"
        }, {
            id: "infoBar",
            name: "相册信息",
            uri: "./plugins.infoBar"
        }, {
            id: "moreOper",
            name: "更多",
            uri: "./plugins.moreOper",
            enable: function(e) {
                e.ownerUin;
                e = QZONE.FP.getQzoneConfig().loginUin;
                return !(e < 1e3) && (i("#js-btn-downloadPhoto").parent().show(),
                i("#js-btn-sharePhoto").parent().hide(),
                i("#js-btn-moreOper").parent().show(),
                i("#js-btn-rotateRight").show(),
                i("#js-btn-meituxiuxiu").parent().hide(),
                i("#js-btn-copyAddress").parent().hide(),
                i("#js-btn-delPhoto").parent().hide(),
                i("#js-btn-movePhoto").parent().hide(),
                !0)
            }
        }, {
            id: "collect",
            name: "收藏",
            uri: "./plugins.collect",
            enable: function(e) {
                e.ownerUin;
                return !(QZONE.FP.getQzoneConfig().loginUin < 1e3) && (i("#js-btn-collect-li").show(),
                !0)
            }
        }, {
            id: "face",
            name: "圈人推荐",
            uri: "./plugins.face"
        }, {
            id: "quanren",
            name: "圈人",
            uri: "./plugins.quanren",
            enable: function(e) {
                return !1
            }
        }, {
            id: "rightmenu",
            name: "右键菜单",
            uri: "./plugins.rightmenu",
            enable: function(e) {
                e && e.ownerUin;
                e = QZONE.FP.getQzoneConfig().loginUin,
                document;
                return !(e < 1e3)
            }
        }, {
            id: "fullScreen",
            name: "幻灯片",
            uri: "./plugins.fullScreen",
            enable: function(e) {
                var t = QZONE.FP.getQzoneConfig().loginUin;
                return !(window.inqq || e && e.inqq) && (t < 1e3 ? (i("#js-btn-fullScreen").hide(),
                !1) : (i("#js-btn-fullScreen").show(),
                !0))
            }
        }, {
            id: "video",
            name: "视频",
            uri: "./plugins.video",
            enable: function(e) {
                return !0
            }
        }]
    }
}),
define.pack("./configs.311.video", ["photo.v7/lib/jquery", "./configs.311"], function(e, exports, module) {
    var i = e("photo.v7/lib/jquery")
      , e = e("./configs.311")
      , e = i.extend(!0, {}, e, {
        number: 1,
        cgi: {
            getPhotos: "http://taotao.qq.com/cgi-bin/video_get_data",
            type: "video"
        },
        viewer: {
            maxViewerWidth: 1280,
            maxViewerHeight: 720,
            minViewerWidth: 640,
            minFullViewerWidth: 640,
            minViewerHeight: 360,
            topGap: 16,
            bottomGap: 16,
            fullBottomGap: 30,
            leftGap: 20,
            rightGap: 20,
            adBoxHeight: 150,
            hideRotate: !0,
            hideFigureHandle: !0,
            hideFigureArea: !0
        },
        sideBar: {
            width: 380
        },
        showBtnTxt: 1,
        info: {
            tmplName: "info_311",
            getDisplayTimeStr: function(e) {
                return slide.util.formatTime2(e.uploadTime)
            }
        },
        getFakeFirstData: function() {
            var e = slide.option.videoInfo;
            if (e) {
                e = {
                    isFakeFirstData: !0,
                    ownerUin: e.ownerUin,
                    topicId: "",
                    ugcType: "video",
                    lloc: e.vid,
                    picKey: e.vid,
                    url: e.url,
                    pre: e.pre,
                    name: e.title,
                    desc: e.desc,
                    desctype: "text",
                    uploadTime: e.uploadTime,
                    videoType: "true" == e.isNewFormat || 1 == e.isNewFormat ? 0 : 1,
                    videoTime: e.duration,
                    videoPriv: e.priv
                };
                return slide.util.processSingleVideoShuoShuoData(e, null, {
                    ownerUin: QZONE.FP.getQzoneConfig("ownerUin"),
                    ownerName: QZONE.FP.getNickname()
                }),
                e
            }
        },
        retweet: {
            getRetweetData: function(e) {
                return {
                    appid: e.appid || slide.option.appid,
                    uin: e.ownerUin,
                    tid: e.tid,
                    content: e.desc
                }
            }
        }
    });
    return e.plugins = [{
        id: "video",
        name: "视频",
        uri: "./plugins.video",
        enable: function(e) {
            return !0
        }
    }, {
        id: "retweet",
        name: "转发",
        uri: "./plugins.retweet"
    }, {
        id: "collect",
        name: "收藏",
        uri: "./plugins.collect",
        enable: function(e) {
            var t = e.ownerUin
              , e = QZONE.FP.getQzoneConfig().loginUin;
            return !(!e || t == e) && (i("#js-btn-collect-li").show(),
            !0)
        }
    }, {
        id: "moreOper",
        name: "更多",
        uri: "./plugins.moreOper",
        enable: function(e) {
            i("#js-other-menu ul li").hide();
            var t = e.ownerUin
              , e = QZONE.FP.getQzoneConfig().loginUin;
            return e && i(t == e ? "#js-btn-delPhoto-li" : "#js-btn-collect-li").show(),
            !0
        }
    }],
    e
}),
define.pack("./configs.311.videoandrec", ["photo.v7/lib/jquery", "./configs.311", "./configs.0.videoandrec"], function(e, exports, module) {
    var t = e("photo.v7/lib/jquery")
      , i = e("./configs.311")
      , e = e("./configs.0.videoandrec")
      , i = t.extend(!0, {}, i, e);
    return i.plugins = e.plugins,
    i
}),
define.pack("./configs.4.comment", ["photo.v7/lib/jquery", "./configs.4"], function(e, exports, module) {
    var t = e("photo.v7/lib/jquery")
      , e = e("./configs.4")
      , e = t.extend(!0, {}, e, {
        cgi: {
            getPhotos: "http://app.photo.qzone.qq.com/cgi-bin/app/cgi_get_comment_v3",
            type: "comment"
        },
        comment: {
            getTopicId: function(e) {
                return slide.option.topicId
            },
            getCgiUrls: function() {
                return window.g_qzonetoken ? {
                    loadComments: "http://app.photo.qzone.qq.com/cgi-bin/app/cgi_get_comment_v3?qzonetoken=" + window.g_qzonetoken,
                    postComment: "http://photo.qzone.qq.com/cgi-bin/common/cgi_add_reply_v2?qzonetoken=" + window.g_qzonetoken,
                    removeComment: "http://photo.qzone.qq.com/cgi-bin/common/cgi_del_reply_v2?qzonetoken=" + window.g_qzonetoken,
                    postReply: "http://photo.qzone.qq.com/cgi-bin/common/cgi_add_reply_v2?qzonetoken=" + window.g_qzonetoken,
                    removeReply: "http://photo.qzone.qq.com/cgi-bin/common/cgi_del_reply_v2?qzonetoken=" + window.g_qzonetoken
                } : {
                    loadComments: "http://app.photo.qzone.qq.com/cgi-bin/app/cgi_get_comment_v3",
                    postComment: "http://photo.qzone.qq.com/cgi-bin/common/cgi_add_reply_v2",
                    removeComment: "http://photo.qzone.qq.com/cgi-bin/common/cgi_del_reply_v2",
                    postReply: "http://photo.qzone.qq.com/cgi-bin/common/cgi_add_reply_v2",
                    removeReply: "http://photo.qzone.qq.com/cgi-bin/common/cgi_del_reply_v2"
                }
            }
        }
    });
    return e.plugins = [{
        id: "moreOper",
        name: "更多",
        uri: "./plugins.moreOper",
        enable: function(e) {
            return t("#js-btn-downloadPhoto").parent().hide(),
            t("#js-btn-moreOper").show(),
            2 == PSY.helper.getImageInfoByUrl(e.originUrl).type ? t("#js-btn-rotateRight").hide() : t("#js-btn-rotateRight").show(),
            t("#js-btn-meituxiuxiu").parent().hide(),
            t("#js-btn-copyAddress").parent().hide(),
            t("#js-btn-delPhoto").parent().hide(),
            t("#js-btn-movePhoto").parent().hide(),
            t("#js-btn-sharePhoto").parent().hide(),
            !0
        }
    }],
    e
}),
define.pack("./configs.4.iphoto", ["photo.v7/lib/jquery", "./configs.4"], function(e, exports, module) {
    var t = e("photo.v7/lib/jquery")
      , e = e("./configs.4");
    return t.extend(!0, {}, e, {
        cgi: {
            getPhotos: "http://shplist.photo.qq.com/fcgi-bin/cgi_photo_flow_floatview_list"
        }
    })
}),
define.pack("./configs.4", ["photo.v7/lib/jquery"], function(require, exports, module) {
    var i = require("photo.v7/lib/jquery");
    return {
        number: 15,
        updateOffset: function(e) {
            return slide.photos.length
        },
        supportPrevFetch: !0,
        autoResizeCmtArea: !0,
        useFullScreenMode: !0,
        autoSaveRotate: !1,
        moreCommentMode: !1,
        enableWebpFlash: function() {
            return !1
        },
        getExtraPageParam: function(e) {
            var t = {}
              , i = slide.photos[slide.photos.length - 1]
              , o = slide.photos[0]
              , e = e || {};
            return t.sortOrder = slide.option.sortOrder || 3,
            t.showMode = 1,
            t.need_private_comment = 1,
            0 == slide.offset ? (e.hasOwnProperty("prevNum") ? t.prevNum = e.prevNum : t.prevNum = 9,
            e.hasOwnProperty("postNum") ? t.postNum = e.postNum : t.postNum = 18) : (t.picKey = e.picKey || i.picKey,
            t.shootTime = i.shootTime,
            e.getPrevPhoto && (t.picKey = o.picKey,
            t.shootTime = o.shootTime),
            e.hasOwnProperty("prevNum") ? t.prevNum = e.prevNum : t.prevNum = 0,
            e.hasOwnProperty("postNum") ? t.postNum = e.postNum : t.postNum = 20),
            t
        },
        cgi: {
            getPhotos: "http://plist.photo.qq.com/fcgi-bin/cgi_floatview_photo_list_v2"
        },
        info: {
            tmplName: "info_4",
            getDisplayTimeStr: function(e) {
                return e.createTime || e.uploadTime
            },
            getAlbumLink: function(e) {
                return "http://user.qzone.qq.com/" + e.ownerUin + "/photo/" + e.albumId
            },
            reprintUrl: "https://" + location.hostname + "/proxy/domain/qzonestyle.gtimg.cn/qzone/photo/zone/ic_reprint.html",
            reprintFrom: "photo"
        },
        getLikeKey: function(e) {
            var t = e.ownerUin
              , i = e.albumId
              , o = "http://user.qzone.qq.com/" + t + "/photo/" + i + "/" + (e.lloc || e.picKey)
              , o = e.batchId ? o + "^||^" + ("http://user.qzone.qq.com/" + t + "/batchphoto/" + i + "/" + e.batchId) + "^||^1" : o;
            return {
                uniKey: o,
                curKey: o
            }
        },
        comment: {
            checkNeedPrivateComment: function(e) {
                return slide.topic && slide.topic.is_share_album ? 0 : 1
            },
            getTopicId: function(e) {
                return e.batchId,
                [e.albumId, e.lloc || e.picKey].join("_")
            },
            getExtraParams: function(e) {
                e = {
                    need_private_comment: 1,
                    albumId: e.albumId,
                    qzone: "qzone",
                    plat: "qzone"
                };
                return {
                    loadComments: e,
                    postComment: e,
                    postReply: e,
                    removeComment: {},
                    removeReply: {}
                }
            },
            requestStrategy: {},
            getCgiUrls: function(e) {
                return window.g_qzonetoken ? {
                    loadComments: "http://app.photo.qzone.qq.com/cgi-bin/app/cgi_pcomment_xml_v2",
                    postComment: "http://photo.qzone.qq.com/cgi-bin/common/cgi_add_piccomment_v2?qzonetoken=" + window.g_qzonetoken,
                    removeComment: "http://photo.qzone.qq.com/cgi-bin/common/cgi_del_piccomment_v2?qzonetoken=" + window.g_qzonetoken,
                    postReply: "http://photo.qzone.qq.com/cgi-bin/common/cgi_add_reply_v2?qzonetoken=" + window.g_qzonetoken,
                    removeReply: "http://photo.qzone.qq.com/cgi-bin/common/cgi_del_reply_v2?qzonetoken=" + window.g_qzonetoken
                } : {
                    loadComments: "http://app.photo.qzone.qq.com/cgi-bin/app/cgi_pcomment_xml_v2",
                    postComment: "http://photo.qzone.qq.com/cgi-bin/common/cgi_add_piccomment_v2",
                    removeComment: "http://photo.qzone.qq.com/cgi-bin/common/cgi_del_piccomment_v2",
                    postReply: "http://photo.qzone.qq.com/cgi-bin/common/cgi_add_reply_v2",
                    removeReply: "http://photo.qzone.qq.com/cgi-bin/common/cgi_del_reply_v2"
                }
            },
            viewModelTag: "common",
            referer: "photo"
        },
        stat: {
            speedFlag: "177-11-46",
            returnCode: 110265,
            preloadSpeed: "177-1-152",
            imgShowTime: "177-1-154"
        },
        plugins: [{
            id: "reprint",
            name: "转载",
            uri: "./plugins.reprint",
            enable: function(e) {
                return !0
            }
        }, {
            id: "recom",
            name: "推荐相册",
            uri: "./plugins.recom"
        }, {
            id: "lbs",
            name: "lbs",
            uri: "./plugins.lbs"
        }, {
            id: "infoBar",
            name: "相册信息",
            uri: "./plugins.infoBar"
        }, {
            id: "face",
            name: "圈人推荐",
            uri: "./plugins.face"
        }, {
            id: "cover",
            name: "设为封面",
            uri: "./plugins.cover",
            enable: function(e) {
                var t = e.ownerUin
                  , e = QZONE.FP.getQzoneConfig().loginUin;
                return !(e < 1e3) && (t == e ? (i("#js-btn-cover-li").show(),
                !0) : (i("#js-btn-cover-li").hide(),
                !1))
            }
        }, {
            id: "collect",
            name: "收藏",
            uri: "./plugins.collect",
            enable: function(e) {
                e.ownerUin;
                return !(QZONE.FP.getQzoneConfig().loginUin < 1e3) && (i("#js-btn-collect-li").show(),
                !0)
            }
        }, {
            id: "mainShow",
            name: "主页展示",
            uri: "./plugins.mainShow",
            enable: function(e) {
                var t = e.ownerUin
                  , e = QZONE.FP.getQzoneConfig().loginUin;
                return !(e < 1e3) && (t == e ? (i("#js-btn-cover-li").show(),
                !0) : (i("#js-btn-cover-li").hide(),
                !1))
            }
        }, {
            id: "moreOper",
            name: "更多",
            uri: "./plugins.moreOper",
            enable: function(e) {
                var t = e.ownerUin
                  , e = QZONE.FP.getQzoneConfig().loginUin;
                return !(e < 1e3) && (e && (i("#js-btn-downloadPhoto").parent().show(),
                i("#js-btn-sharePhoto").parent().show()),
                t == e ? (i("#js-btn-rotateRight").show(),
                i("#js-btn-copyAddress").parent().show(),
                i("#js-btn-delPhoto").parent().show(),
                i("#js-btn-movePhoto").parent().show()) : (i("#js-btn-rotateRight").show(),
                i("#js-btn-copyAddress").parent().show(),
                i("#js-btn-delPhoto").parent().hide(),
                i("#js-btn-movePhoto").parent().hide()),
                !0)
            }
        }, {
            id: "fullScreen",
            name: "幻灯片",
            uri: "./plugins.fullScreen",
            enable: function(e) {
                e.ownerUin;
                var t = QZONE.FP.getQzoneConfig().loginUin;
                document;
                return !(window.inqq || e && e.inqq) && (t < 1e3 ? (i("#js-btn-fullScreen").hide(),
                !1) : (i("#js-btn-fullScreen").show(),
                !0))
            }
        }, {
            id: "quanren",
            name: "圈人",
            uri: "./plugins.quanren",
            enable: function(e) {
                return !1
            }
        }, {
            id: "rightmenu",
            name: "右键菜单",
            uri: "./plugins.rightmenu",
            enable: function(e) {
                e && e.ownerUin;
                e = QZONE.FP.getQzoneConfig().loginUin,
                document;
                return !(e < 1e3)
            }
        }, {
            id: "video",
            name: "视频",
            uri: "./plugins.video",
            enable: function(e) {
                return !0
            }
        }]
    }
}),
define.pack("./configs.4.videoandrec", ["photo.v7/lib/jquery", "./configs.4", "./configs.0.videoandrec"], function(e, exports, module) {
    var t = e("photo.v7/lib/jquery")
      , i = e("./configs.4")
      , e = e("./configs.0.videoandrec")
      , i = t.extend(!0, {}, i, e);
    return i.plugins = e.plugins,
    i
}),
define.pack("./configs.421", ["photo.v7/lib/jquery"], function(require, exports, module) {
    var t = require("photo.v7/lib/jquery");
    module.exports = {
        number: 20,
        updateOffset: function(e) {
            return slide.photos.length
        },
        needInsertImg: !1,
        supportPrevFetch: !0,
        getExtraPageParam: function(e) {
            var t = {}
              , i = slide.photos[slide.photos.length - 1]
              , o = slide.photos[0]
              , e = e || {};
            return t.sortOrder = slide.option.sortOrder || 3,
            t.showMode = 1,
            0 == slide.offset ? (e.hasOwnProperty("prevNum") ? t.prevNum = e.prevNum : t.prevNum = 9,
            e.hasOwnProperty("postNum") ? t.postNum = e.postNum : t.postNum = 18) : (t.picKey = e.picKey || i.picKey,
            e.getPrevPhoto && (t.picKey = o.picKey),
            e.hasOwnProperty("prevNum") ? t.prevNum = e.prevNum : t.prevNum = 0,
            e.hasOwnProperty("postNum") ? t.postNum = e.postNum : t.postNum = 20),
            t
        },
        ____updateOffset: function(e) {
            return slide.offset + 40
        },
        cgi: {
            getPhotos: window.location.protocol + "//h5.qzone.qq.com/proxy/domain/u.photo.qzone.qq.com/cgi-bin/upp/qun_floatview_photo"
        },
        webappCgi: {
            getPhotos: window.location.protocol + "//h5.qzone.qq.com/groupphoto/inqq?cmd=qunGetPhotoListEx"
        },
        webappReqDataAdatper: function(e) {
            var t = e.topicId.split("_");
            return {
                qunid: t[0],
                uin: 0,
                albumid: t[1],
                curlloc: e.picKey,
                left: e.isFirst ? 1 : 0,
                right: 1,
                password: "",
                get_comment: 1
            }
        },
        webappResDataAdatper: function(e) {
            for (var t = (e = e || {}).albuminfo || {}, i = e.photolist || [], o = [], n = 0; n < i.length; n++) {
                var s = i[n] || {}
                  , a = s.photourl || {}
                  , r = a[1] || a[11] || a[2] || a[3] || a[-1] || {}
                  , d = s.videodata || {}
                  , a = {
                    albumId: t.albumid || "",
                    batchId: s.batchid || 0,
                    batchNum: 0,
                    cmtTotal: s.commentcount || "",
                    desc: s.desc,
                    descType: "text",
                    exif: {
                        exposureCompensation: "",
                        exposureMode: "",
                        exposureProgram: "",
                        exposureTime: "",
                        flash: "",
                        fnumber: "",
                        focalLength: "",
                        iso: "",
                        lensModel: "",
                        make: "",
                        meteringMode: "",
                        model: "",
                        originalTime: ""
                    },
                    groupId: t.qunid,
                    height: r.height || 0,
                    likeList: null,
                    likeTotal: s.likecount || "",
                    name: "",
                    ownerName: "",
                    ownerUin: s.uploadUin || "",
                    picKey: s.lloc || "",
                    pre: (a[3] || a[11] || a[2] || a[1] || a[-1] || {}).url || "",
                    raw_upload: 0 < s.origin_size ? 1 : 0,
                    topicId: t.qunid + "_" + t.albumid,
                    topicName: t.name || "",
                    uploadTime: s.uUploadTime || 0,
                    url: r.url,
                    width: r.width || 0
                };
                s.videoflag && (a.video_info = {
                    vid: d.videoid || "",
                    cover_width: r.width || 0,
                    cover_height: r.height || 0,
                    duration: d.videotime || 0,
                    video_url: d.videourl || "",
                    video_h265url: "",
                    video_share_h5: ""
                }),
                o.push(a)
            }
            return {
                first: 0,
                index: e.index || 0,
                last: e.right_finish,
                photos: o,
                picPosInPage: e.indexInVec || 0,
                picPosInTotal: e.index || 0,
                picTotal: t.total || 0,
                role: 2,
                showMode: "1",
                single: {
                    likeList: null,
                    likeTotal: 0
                },
                topic: {
                    iscreator: 1,
                    ismanager: 0
                }
            }
        },
        info: {
            tmplName: "info_421",
            getDisplayTimeStr: function(e) {
                return e.createTime || e.uploadTime
            },
            getAlbumLink: function(e) {
                return "http://qun.qzone.qq.com/group#!/" + e.groupId + "/photo/" + e.albumId
            },
            reprintUrl: "https://" + location.hostname + "/proxy/domain/qzonestyle.gtimg.cn/qzone/photo/zone/reprint.html",
            reprintFrom: "qun"
        },
        getLikeKey: function(e) {
            e.ownerUin;
            var t = e.albumId
              , i = e.lloc || e.picKey
              , o = e.groupId
              , i = "421_1_0_" + o + "|" + t + "|" + i
              , i = e.batchId ? i + "^||^" + ("421_1_0_" + o + "|" + t + "|" + e.batchId) + "^||^" + (e.batchNum && 1 < e.batchNum ? "1" : "0") : i;
            return {
                uniKey: i,
                curKey: i
            }
        },
        comment: {
            getTopicId: function(e) {
                return e.batchId,
                [e.groupId, e.albumId, e.lloc || e.picKey].join("|")
            },
            getExtraParams: function(e) {
                return {
                    loadComments: {},
                    postComment: {
                        is_reply: 0,
                        ownerUin: e.ownerUin
                    },
                    postReply: {
                        is_reply: 1,
                        ownerUin: e.ownerUin
                    },
                    removeComment: {
                        is_reply: 0,
                        ownerUin: e.ownerUin
                    },
                    removeReply: {
                        is_reply: 1,
                        ownerUin: e.ownerUin
                    }
                }
            },
            requestStrategy: {},
            cgiUrls: {
                loadComments: window.location.protocol + "//h5.qzone.qq.com/proxy/domain/u.photo.qzone.qq.com/cgi-bin/upp/qun_list_photocmt_v2",
                postComment: window.location.protocol + "//h5.qzone.qq.com/proxy/domain/u.photo.qzone.qq.com/cgi-bin/upp/qun_add_photocmt_v2",
                removeComment: window.location.protocol + "//h5.qzone.qq.com/proxy/domain/u.photo.qzone.qq.com/cgi-bin/upp/qun_del_photocmt_v2",
                postReply: window.location.protocol + "//h5.qzone.qq.com/proxy/domain/u.photo.qzone.qq.com/cgi-bin/upp/qun_add_photocmt_v2",
                removeReply: window.location.protocol + "//h5.qzone.qq.com/proxy/domain/u.photo.qzone.qq.com/cgi-bin/upp/qun_del_photocmt_v2"
            },
            viewModelTag: "common",
            referer: "qunphoto"
        },
        stat: {
            speedFlag: "177-11-53",
            returnCode: 110280
        },
        plugins: [{
            id: "video",
            name: "视频",
            uri: "./plugins.video",
            enable: function(e) {
                return !0
            }
        }, {
            id: "reprint",
            name: "转载",
            uri: "./plugins.reprint",
            enable: function(e) {
                return window.inqq || e && e.inqq,
                !0
            }
        }, {
            id: "moreOper",
            name: "更多",
            uri: "./plugins.moreOper",
            enable: function(e) {
                e.ownerUin;
                e = QZONE.FP.getQzoneConfig().loginUin;
                return slide.util.getParameter("inqq") && (t("#js-figure-area .js-large-mode").hide(),
                t("#js-figure-area .js-hd-mode").attr("title", "大图模式")),
                !(e < 1e3) && (t("#js-btn-downloadPhoto").parent().show(),
                t("#js-btn-rotateRight").show(),
                t("#js-btn-meituxiuxiu").parent().hide(),
                t("#js-btn-copyAddress").parent().hide(),
                t("#js-btn-delPhoto").parent().hide(),
                t("#js-btn-movePhoto").parent().hide(),
                t("#js-btn-sharePhoto").parent().hide(),
                !0)
            }
        }, {
            id: "rightmenu",
            name: "右键菜单",
            uri: "./plugins.rightmenu",
            enable: function(e) {
                e && e.ownerUin;
                e = QZONE.FP.getQzoneConfig().loginUin,
                document;
                return !(e < 1e3)
            }
        }, {
            id: "infoBar",
            name: "相册信息",
            uri: "./plugins.infoBar"
        }]
    }
}),
define.pack("./configs.907", ["photo.v7/lib/jquery"], function(require, exports, module) {
    var t = require("photo.v7/lib/jquery");
    return {
        favMode: !0,
        sideBar: {
            width: 0
        },
        updateOffset: function(e) {
            return 0
        },
        cgi: {},
        info: {
            getDisplayTimeStr: function(e) {
                return e && e.createTime || ""
            }
        },
        comment: {},
        stat: {
            speedFlag: "177-11-53",
            returnCode: 110280
        },
        plugins: [{
            id: "moreOper",
            name: "更多",
            uri: "./plugins.moreOper",
            enable: function(e) {
                return t("#js-viewer-figure").find(".js-large-mode").hide(),
                t("#js-btn-downloadPhoto").parent().hide(),
                t("#js-btn-moreOper").show(),
                2 == PSY.helper.getImageInfoByUrl(e.originUrl).type ? t("#js-btn-rotateRight").hide() : t("#js-btn-rotateRight").show(),
                t("#js-btn-meituxiuxiu").parent().hide(),
                t("#js-btn-copyAddress").parent().hide(),
                t("#js-btn-delPhoto").parent().hide(),
                t("#js-btn-movePhoto").parent().hide(),
                !0
            }
        }]
    }
}),
define.pack("./configs.default", [], function(require, exports, module) {
    return {
        cgi: {},
        thumbNail: {
            pageSize: 19,
            areaTitle: "",
            maxThumbNailWidth: 1155,
            imgGapWidth: 5,
            arrowWidth: 30,
            imgWidth: 50,
            imgHeight: 50,
            selectClass: "on",
            hoverClass: ""
        },
        viewer: {
            maxViewerWidth: 853,
            maxViewerHeight: 800,
            minViewerWidth: 400,
            minFullViewerWidth: 450,
            minViewerHeight: 400,
            topGap: 16,
            bottomGap: 16,
            fullBottomGap: 30,
            leftGap: 20,
            rightGap: 20,
            adBoxHeight: 150
        },
        sideBar: {
            width: 310
        },
        face: {
            boxHeight: 180,
            width: 80,
            height: 80
        },
        showBtnTxt: 0,
        needInsertImg: !0
    }
}),
define.pack("./event", ["photo.v7/lib/jquery"], function(e, exports, module) {
    var s = jQuery = e("photo.v7/lib/jquery")
      , e = s({});
    return e.init = function() {
        var i, o, n;
        this._hasInit || (this._hasInit = !0,
        i = this,
        o = s(window).width(),
        n = s(window).height(),
        s(window).bind("resize", function() {
            i.resizeTimer && clearTimeout(i.resizeTimer),
            i.resizeTimer = setTimeout(function() {
                var e = s(window).width()
                  , t = s(window).height();
                e == o && t == n || (o = e,
                n = t,
                (t = s(".js-slide-iframe")).length && s(t).width(o).height(n),
                i.trigger("afterWindowResize"))
            }, 100)
        }))
    }
    ,
    e
}),
define.pack("./imgMap", ["photo.v7/lib/jquery", "./event", "./util"], function(e, exports, module) {
    var t = e("photo.v7/lib/jquery")
      , v = e("./event")
      , _ = e("./util")
      , e = {};
    return t.extend(e, {
        init: function() {
            this.wrapper = t("#js-map-ctn"),
            this.img = t("#js-img-map"),
            this.dispImg = t("#js-img-disp"),
            this.imgWrapper = t("#js-viewer-imgWraper"),
            this.handler = t("#js-map-handler"),
            this.blankUrl = "http://" + (siDomain || "qzonestyle.gtimg.cn") + "/ac/b.gif",
            this.bind()
        },
        bind: function() {
            var i;
            this._hasBindEvent || (this._hasBindEvent = !0,
            i = this,
            v.bind("go", function(e, t) {
                t && t.first || i.hideMap()
            }),
            v.bind("close", function() {
                i.dispose()
            }),
            this.handler.bind("mousedown", function(e) {
                e.preventDefault(),
                i.doDrag(e)
            }))
        },
        showMap: function(e) {
            var e = slide.photos[slide.index] || e
              , a = e.pre || slide.option.pre
              , e = e.url
              , r = this
              , a = a.replace("/a/", "/m/");
            _.imgLoad(e, function(e) {
                var t = e.width
                  , i = e.height
                  , o = e.url
                  , n = r.wrapper.width()
                  , s = 1;
                slide.isOpen() && ((e = slide.photos[slide.index]) && e.url && e.url != o || (s = i < t ? n / t : n / i,
                r.wrapper.show(),
                r.handler.show(),
                r.img.css({
                    width: t * s,
                    height: i * s
                }).attr({
                    src: a
                }).show()))
            })
        },
        hideMap: function() {
            t("#js-map-ctn").hide(),
            t("#js-img-map").attr({
                src: this.blankUrl
            }).hide(),
            t("#js-map-handler").hide()
        },
        setPosition: function(e) {
            var t, i = 110, o = 110, n = {
                x: 0,
                y: 0
            };
            e.left = parseInt(e.left),
            e.top = parseInt(e.top),
            e.imgW > e.imgH ? (o = e.imgH / e.imgW * 110,
            n.y = (110 - o) / 2) : (i *= e.imgW / e.imgH,
            n.x = (110 - i) / 2);
            var s = (t = i / e.imgW) * e.viewerW
              , a = t * e.viewerH
              , o = 0
              , i = 0
              , i = e.imgW > e.imgH ? (o = -e.left * t,
            n.y - e.top * t) : (o = n.x - e.left * t,
            -e.top * t);
            this.handler.css({
                left: Math.floor(o),
                top: Math.floor(i),
                width: s - 6,
                height: a - 6
            }).show()
        },
        doDrag: function(e) {
            var i, n = this, s = this.img.width(), a = this.img.height(), t = this.img.position(), r = t.left, d = t.top - 2, o = this.handler.width(), l = this.handler.height(), p = this.wrapper.width() - 6, c = this.wrapper.height(), h = this.handler.position(), u = this.dispImg.width(), m = this.dispImg.height(), g = this.imgWrapper.width(), f = this.imgWrapper.height();
            _.drag.bind({
                selector: n.handler,
                event: e,
                start: function(e, t) {
                    f < m && (e.overHeightImg = !0),
                    g < u && (e.overWidthImg = !0),
                    i = a < s ? {
                        xMin: 0,
                        xMax: p - o,
                        yMin: (c - a) / 2,
                        yMax: (c - a) / 2 + a - l - 6
                    } : {
                        xMin: (p - s) / 2 - (o - s) - 3,
                        xMax: (p - s) / 2 + 3,
                        yMin: 0,
                        yMax: a - l - 6
                    },
                    e.range = i
                },
                move: function(e, t) {
                    var i = e.range
                      , o = h.left + t.x
                      , t = h.top + t.y;
                    o < i.xMin ? o = i.xMin : o > i.xMax && (o = i.xMax),
                    (!e.overWidthImg || !e.overHeightImg) && e.overWidthImg ? t > i.yMin ? t = i.yMin : t < i.yMax && (t = i.yMax) : t < i.yMin ? t = i.yMin : t > i.yMax && (t = i.yMax),
                    n.handler.css({
                        left: o,
                        top: t
                    }),
                    slide.viewer.setPosition({
                        left: r - o,
                        top: d - t,
                        imgW: s,
                        imgH: a,
                        yMax: i.yMax
                    })
                },
                stop: function(e, t) {
                    v.trigger("imgDragDone")
                }
            })
        },
        dispose: function() {
            this.hideMap()
        }
    }),
    e
}),
define.pack("./index", [], function(require, exports, module) {
    return setTimeout(function() {
        seajs.use("photo.v7/common/viewer2/lazyload")
    }, 3e3),
    require.get = require
}),
define.pack("./infoArea", ["photo.v7/lib/jquery", "photo.v7/lib/photo", "./event", "./tmpl", "./util", "./api.photos", "./slide"], function(require, exports, module) {
    var h = require("photo.v7/lib/jquery")
      , u = require("photo.v7/lib/photo")
      , n = require("./event")
      , s = require("./tmpl")
      , m = require("./util")
      , g = require("./api.photos")
      , l = m.evt
      , i = {};
    return h.extend(i, {
        init: function() {
            this.clickInterBtn = !1,
            this.wrapper = h(".js-userinfo-ctn"),
            this.descWrapperId = "js-description",
            this.descInnerId = "js-description-inner",
            this.expandDescId = "js-expandDesc",
            this.foldDescId = "js-foldDesc",
            this.bind(),
            h("#js-sidebar-ctn .handle-tab").hide()
        },
        bind: function() {
            var r;
            this._hasBindEvent || (this._hasBindEvent = !0,
            r = this,
            n.bind("changeInterBtn", function(e, t) {
                r.clickInterBtn = t && t.clickInterBtn
            }),
            n.bind("onShowFakeFirstData", function(e, t) {
                t = t.photo;
                r.render(t);
                h("#js-sidebar-ctn .js-userinfo-ctn").show(),
                h("#js-description").show(),
                h("#js-desc-editor").hide(),
                h("#js-sidebar-ctn .handle-tab").hide();
                r.setDescWrapperHeight()
            }),
            n.bind("go", function(e, t) {
                var i;
                slide.dataSucc && (i = t.photo,
                r.render(i),
                h("#js-sidebar-ctn .js-userinfo-ctn").show(),
                h("#js-description").show(),
                h("#js-desc-editor").hide(),
                t = h("#js-sidebar-ctn .handle-tab"),
                "comment" != slide.option.type && ("videoandrec" != slide.option.type || i.tid) ? t.show() : t.hide(),
                t.removeClass("j-show-txt j-show-txt-num"),
                2 == slide.config.showBtnTxt ? t.addClass("j-show-txt j-show-txt-num") : 1 == slide.config.showBtnTxt && t.addClass("j-show-txt"),
                r.setEditor(i))
            }),
            n.bind("close", function() {
                r.dispose()
            }),
            n.bind("onDescHtmlChange", function() {
                r.setDescWrapperHeight()
            }),
            h("#js-interactive-btn").on(l.mouseenter + " " + l.mousemove, function() {
                if (!i.clickInterBtn) {
                    h("#js-interactive-btn").removeAttr("title");
                    var e = h(this)
                      , t = h("#js-sidebar-ctn");
                    return h("#js-viewer-container #js-interactive-menu").css({
                        position: "absolute",
                        top: e.offset().top - t.offset().top + e.height() - 3,
                        left: e.position().left,
                        zIndex: 99
                    }).show().one(l.mouseleave, function() {
                        h(this).hide()
                    }),
                    !1
                }
            }).on(l.mouseleave, function(e) {
                var t = h(this)
                  , i = +t.attr("js-timer");
                return i && clearTimeout(i),
                i = setTimeout(function() {
                    h("#js-viewer-container #js-interactive-menu li:hover").length || h("#js-viewer-container #js-interactive-menu").hide()
                }, 309),
                t.attr("js-timer", i),
                !1
            }),
            h("#js-othermenu-btn").on(l.mouseenter + " " + l.mousemove, function() {
                var e = h(this)
                  , t = h("#js-sidebar-ctn");
                return h("#js-viewer-container #js-other-menu").css({
                    position: "absolute",
                    top: e.offset().top - t.offset().top + e.height() - 3,
                    left: e.position().left + e.width() / 2 - 40,
                    zIndex: 99
                }).show().one(l.mouseleave, function() {
                    h(this).hide()
                }),
                !1
            }).on(l.mouseleave, function(e) {
                var t = h(this)
                  , i = +t.attr("js-timer");
                return i && clearTimeout(i),
                i = setTimeout(function() {
                    h("#js-viewer-container #js-other-menu li:hover").length || h("#js-viewer-container #js-other-menu").hide()
                }, 309),
                t.attr("js-timer", i),
                !1
            }),
            this.wrapper.delegate("#js-btn-exif", "mouseenter", function() {
                r.closeExifTimer && clearTimeout(r.closeExifTimer);
                var i = r.wrapper.find(".mod-exif-info")
                  , o = slide.photos[slide.index]
                  , n = i.parents(".user-photo-details");
                if (421 == slide.config.appid)
                    r.renderExif({
                        ctn: i,
                        photo: o
                    }),
                    n.addClass("show-exif-info"),
                    i.show();
                else if (4 == slide.config.appid || 311 == slide.config.appid) {
                    o = slide.photos[slide.index];
                    if (311 == slide.config.appid && 1 != o.who)
                        return !1;
                    if (o.exif && o.cameraType)
                        return r.renderExif({
                            ctn: i,
                            photo: o
                        }),
                        n.addClass("show-exif-info"),
                        i.show(),
                        !1;
                    h("#js-ctn-infoBar .exif-info-bd");
                    var e = o.lloc
                      , t = o.albumId
                      , s = o.originOwnerUin
                      , a = o.picKey.split(",");
                    e || (e = a[a.length - 1],
                    o.lloc = e),
                    t || (t = a[a.length - 2],
                    o.albumId = t),
                    s || (o.originOwnerUin = o.desc && o.desc.ritem && o.desc.ritem.rt_uin),
                    g.getExifInfo(o).done(function(e) {
                        if (0 == e.code) {
                            if (!e.data.hasOwnProperty("cameraType") || !e.data.cameraType)
                                return !1;
                            var t = e.data.cameraType;
                            o.cameraType = t || "";
                            t = e.data.exif;
                            o.exif = t;
                            t = e.data.origin_size;
                            o.origin_size = t;
                            t = e.data.photocubage;
                            o.photocubage = t;
                            e = e.data.phototype;
                            return o.phototype = e,
                            o.exif && o.cameraType ? (r.renderExif({
                                ctn: i,
                                photo: o
                            }),
                            n.addClass("show-exif-info"),
                            i.show(),
                            !1) : void 0
                        }
                    })
                }
                m.stat.pingpv("exif")
            }).delegate("#js-btn-exif", "mouseleave", function() {
                var e = r.wrapper.find(".mod-exif-info").parents(".user-photo-details");
                r.closeExifTimer && clearTimeout(r.closeExifTimer),
                r.closeExifTimer = setTimeout(function() {
                    0 == h("#js-cmt-wrap .mod-exif-info").find(":hover").length && e.removeClass("show-exif-info")
                }, 300)
            }),
            this.wrapper.on("mouseleave", ".mod-exif-info", function() {
                return h(this).parents(".user-photo-details").removeClass("show-exif-info"),
                !1
            }),
            this.wrapper.delegate(".js-btn-follow", l.click, function() {
                var e = h(this)
                  , t = slide.index
                  , i = slide.photos[slide.index];
                r.changeFollow(i).done(function() {
                    t == slide.index && (i.hasFollowed ? (e.addClass("btn-follow-done").text("已关注"),
                    h("#js-btn-follow").text("取消关注")) : (e.removeClass("btn-follow-done").text("关注"),
                    h("#js-btn-follow").text("关注")))
                }).fail(function(e) {
                    t == slide.index && QZONE.FP.showMsgbox(e.message, 5, 2e3)
                })
            }),
            this.wrapper.delegate(".js-btn-expand", l.click, function() {
                var e = h("#" + r.descInnerId).height();
                h("#" + r.descWrapperId).height(e),
                h(this).hide(),
                h("#" + r.foldDescId).show(),
                n.trigger("afterWindowResize"),
                m.stat.pingpv("moredesc")
            }),
            this.wrapper.delegate(".js-btn-fold", l.click, function() {
                r.setDescWrapperHeight(),
                h(this).hide(),
                n.trigger("afterWindowResize"),
                m.stat.pingpv("moredescfold")
            }),
            this.wrapper.delegate(".js-report-click", l.click, function() {
                var e = h(this).attr("data-tag");
                e && m.stat.pingpv(e)
            }),
            h("#js-sidebar-ctn").on(l.click, "#js-add-desc", function() {
                return h("#js-description").trigger(l.click),
                !1
            }),
            h("#js-sidebar-ctn").on(l.click, "a.emot", function() {
                m.stat.pingpv("emotion")
            }),
            h("#js-sidebar-ctn").on(l.click, "a.add_at", function() {
                m.stat.pingpv("at")
            }),
            h("#js-sidebar-ctn").on(l.click, "a.mod_comment_del", function() {
                m.stat.pingpv("delcmt")
            }),
            h("#js-sidebar-ctn").on(l.click, ".quick-comment-list a", function() {
                m.stat.pingpv("quickcmt")
            }),
            h(".js-desc-title", h("#js-desc-editor")).keypress(function(e) {
                if (13 == e.keyCode)
                    return r.descBox.focus(),
                    !1
            }),
            h(".desc-edit", h("#js-desc-editor")).keypress(function(e) {
                10 != e.keyCode && 13 != e.keyCode || !e.ctrlKey || r._postDesc()
            }),
            h(".js-desc-title").focus(function() {
                h(".js-title-editor").addClass("textinput_focus")
            }),
            h(".js-desc-title").blur(function() {
                h(".js-title-editor").removeClass("textinput_focus")
            }))
        },
        changeFollow: function(t) {
            var i = h.Deferred();
            return t.hasFollowed ? QZONE.FrontPage.cancelILike(t.ownerUin, function(e) {
                0 == e.code ? (t.hasFollowed = !1,
                m.stat.pingpv("cancelFollow"),
                i.resolve(e)) : (e.message = e.message || e.msg || "取消关注失败，请稍后重试",
                i.reject(e))
            }, function(e) {
                (e = e || {}).message = e.message || e.msg || "取消关注失败，请稍后重试",
                i.reject(e)
            }) : QZONE.FrontPage.addILike(t.ownerUin, function(e) {
                0 == e.code ? (t.hasFollowed = !0,
                m.stat.pingpv("follow"),
                i.resolve(e)) : (e.message = e.message || e.msg || "关注失败，请稍后重试",
                i.reject(e))
            }, function(e) {
                (e = e || {}).message = e.message || e.msg || "关注失败，请稍后重试",
                i.reject(e)
            }),
            i.promise()
        },
        renderExif: function(t) {
            var i = t.photo.exif;
            i && seajs.use("photo.v7/common/util/exif/format", function(e) {
                e = e.format(i),
                e = s.exifInfo({
                    loginUin: QZONE.FP.getQzoneConfig().loginUin,
                    ownerUin: QZONE.FP.getQzoneConfig().ownerUin,
                    topic: require("./slide").topic,
                    photo: t.photo,
                    exif: e,
                    util: m
                });
                t.ctn.html(e)
            })
        },
        render: function(e) {
            e.descHtml || (e.descHtml = this.getDescHtml(e));
            var t = slide.config.info
              , i = t.tmplName
              , o = t.getDisplayTimeStr(e);
            e.timeStr = o,
            e.albumLink || (e.albumLink = t.getAlbumLink && t.getAlbumLink(e) || ""),
            "function" == typeof i && (i = i(e)),
            i && s[i] ? (this.wrapper.html(s[i]({
                util: m,
                photo: e,
                loginUin: QZONE.FP.getQzoneConfig().loginUin,
                ownerUin: QZONE.FP.getQzoneConfig().ownerUin
            })),
            this.setEditor(e),
            this.setDescWrapperHeight(),
            n.trigger("onSetDescHtml", {
                photo: e
            })) : this.wrapper.html("")
        },
        setEditor: function(e) {
            var t = slide.photos[slide.index];
            if (t !== e)
                return !1;
            var i = h("#js-description")
              , o = (h("#" + this.descInnerId),
            h("#js-desc-editor"))
              , n = o.find(".js-desc-cont")
              , s = (o.find(".js-title-editor"),
            o.find(".js-desc-title"),
            this)
              , e = (h("#js-sidebar-ctn .js-userinfo-ctn"),
            h("#js-sidebar-ctn .handle-tab"),
            QZONE.FP.getQzoneConfig().loginUin);
            if (!e || t.ownerUin != e || 4 != slide.config.appid && 421 != slide.config.appid || "comment" == slide.option.type || "videoandrec" == slide.option.type)
                return h("#js-viewer-desc-edit").hide(),
                h("#js-add-desc").hide(),
                s.setDescWrapperHeight(),
                i.css("cursor", "default"),
                h("#js-photo-name").css("cursor", "default"),
                !1;
            0 == h.trim(t.desc).length ? (h("#js-add-desc").show(),
            s.setDescWrapperHeight()) : h("#js-add-desc").hide(),
            i.attr("title", "点击编辑").css("cursor", "pointer"),
            h("#js-photo-name").attr("title", "点击编辑").css("cursor", "pointer");
            i = s.descBox;
            if (i)
                return i.setContent(""),
                s.bindEditorEvt(),
                !1;
            s.loadEditor({
                photo: t,
                boxDom: o,
                boxCont: n,
                self: s
            })
        },
        loadEditor: function(e) {
            var i = e.descBox
              , o = e.boxDom
              , t = e.boxCont
              , n = e.photo || slide.photos[slide.index]
              , s = e.self || this;
            g.loadSensibleEditor().done(function() {
                var e = F4A.controls.SensibleEditor;
                i = new e({
                    responsorLoaders: {
                        "@": e.friendSelectorLoader
                    }
                }),
                t.html("").append('<span class="num-count"><span class="js-desc-currword">0</span>/200</span>'),
                i.renderIn(t[0]),
                i.loadResponsor("@", {
                    onSuccess: function() {}
                }),
                i.addListener("onKeyDown", function() {
                    QZONE.event.cancelBubble()
                }),
                i.addListener("onContentChanged", function() {
                    var e = i.getContent(!1)
                      , t = e.length
                      , e = o.find(".js-desc-currword").text(e.length);
                    200 < t ? e.addClass("num-hint") : e.removeClass("num-hint")
                }),
                i.setContent(n.desc),
                s.descBox = i,
                s.bindEditorEvt()
            })
        },
        bindEditorEvt: function() {
            var o = h("#js-description")
              , n = (h("#" + this.descInnerId),
            h("#js-desc-editor"))
              , i = (n.find(".js-desc-cont"),
            n.find(".js-title-editor"))
              , s = n.find(".js-desc-title")
              , a = this
              , r = h("#js-sidebar-ctn .js-userinfo-ctn")
              , d = h("#js-sidebar-ctn .handle-tab");
            s.on("input keydown paste cut focus change propertychange", function(e) {
                e.stopPropagation();
                var t = h(this).val().length
                  , e = i.find(".js-desc-title-currword").text(t);
                30 < t ? e.addClass("num-hint") : e.removeClass("num-hint")
            }),
            o.add("#js-viewer-desc-edit").add("#js-photo-name").off(l.click).on(l.click, function(e) {
                if (4 != slide.config.appid && 421 != slide.config.appid)
                    return !1;
                var t = slide.photos[slide.index]
                  , i = QZONE.FP.getQzoneConfig().loginUin;
                if (!i || t.ownerUin != i)
                    return !1;
                e = h(e.target);
                if (e.is("a") && "_blank" == e.attr("target"))
                    return window.open(e.attr("href")),
                    !1;
                m.stat.pingpv("editDescInViewer");
                h(this);
                return o.hide(),
                n.show(),
                s.val(h("#js-photo-name").text()).focus().siblings(".watermark").hide(),
                a.descBox.setContent(t.desc),
                a.editInfo(a.descBox),
                "js-photo-name" == e.attr("id") ? a._focusToEnd(s[0]) : a.descBox.focusOn(t.desc.length, t.desc.length),
                r.hide(),
                d.hide(),
                h("#js-cmt-poster-wrapper").addClass("comment-weak"),
                !1
            }),
            n.off(l.click, ".js-desc-ok").on(l.click, ".js-desc-ok", function() {
                a._postDesc()
            }),
            n.off(l.click, ".js-desc-cancel").on(l.click, ".js-desc-cancel", function() {
                n.hide(),
                o.show();
                var e = slide.photos[slide.index];
                return a.descBox.setContent(e.desc),
                a.editInfo(a.descBox),
                m.stat.pingpv("editDescInViewerCancel"),
                r.show(),
                d.show(),
                h("#js-cmt-poster-wrapper").removeClass("comment-weak"),
                !1
            })
        },
        _postDesc: function() {
            var t = h("#js-description")
              , i = (h("#" + this.descInnerId),
            h("#js-desc-editor"))
              , e = (i.find(".js-desc-cont"),
            i.find(".js-title-editor"),
            i.find(".js-desc-title"))
              , o = this
              , n = h("#js-sidebar-ctn .js-userinfo-ctn")
              , s = h("#js-sidebar-ctn .handle-tab")
              , a = slide.topic
              , r = slide.photos[slide.index]
              , d = d || o.descBox
              , l = d.getContent(!1)
              , p = d.getContent(!0)
              , c = e.val();
            return m.stat.pingpv("editDescInViewerConfirm"),
            200 < l.length ? QZONE.FP.showMsgbox("描述内容不能超过200个字", 5, 2e3) : 30 < c.length ? QZONE.FP.showMsgbox("标题内容不能超过30个字", 5, 2e3) : 0 == h.trim(c).length ? QZONE.FP.showMsgbox("标题内容不能为空", 5, 2e3) : QZONE.FP.getQzoneConfig().loginUin ? (h("#js-cmt-poster-wrapper").removeClass("comment-weak"),
            0 == h.trim(l).length && (p = " "),
            g.modifyDesc({
                album: a,
                picArr: [r],
                desc: p,
                name: c
            }).done(function(e) {
                i.hide(),
                t.show(),
                n.show(),
                s.show(),
                e.data && e.data.desc && (p = e.data.desc);
                e = u.ubb.ubb2html(p, {
                    showAt: !0
                });
                0 == h.trim(p).length ? (h("#js-add-desc").show(),
                h("#js-description-inner").html("").append('<a href="javascrip:;" id="js-add-desc">添加描述</a>')) : h("#js-description-inner").html(e),
                h("#js-photo-name").text(c),
                r.desc = p,
                r.descHtml = e,
                r.name = c,
                o.setDescWrapperHeight(),
                h(window).trigger("afterDescEditInViewerSuccess", {
                    photo: r
                })
            }).fail(function() {})) : QZONE.FP.showLoginbox(),
            !1
        },
        _focusToEnd: function(e) {
            var t;
            e.createTextRange ? ((t = e.createTextRange()).moveStart("character", e.value.length),
            t.collapse(!0),
            t.select()) : (e.setSelectionRange(e.value.length, e.value.length),
            e.focus())
        },
        setDescWrapperHeight: function() {
            var e = 0
              , t = QZONE.FP.getQzoneConfig().loginUin
              , i = slide.photos && slide.photos[slide.index];
            t && i && i.ownerUin == t && 4 == slide.config.appid && "comment" != slide.option.type && (e = 24);
            e = h("#" + this.descInnerId).height() || e;
            100 < e ? (h("#" + this.descWrapperId).height(96).show(),
            h("#" + this.expandDescId).show()) : (h("#" + this.descWrapperId).height(e).show(),
            h("#" + this.expandDescId).hide())
        },
        getDescHtml: function(e) {
            var t, i = e.desc, o = e.desctype, n = slide.util.mood, s = i && i.ritem, a = s && s.rt_con, r = s && s.rtlist, d = [];
            if ("string" == typeof i)
                return i = u.ubb.ubb2html(i, {
                    formatTopic: !0,
                    showAt: !0,
                    formatUrl: !0
                });
            if (i && i.voice)
                return "";
            switch (o) {
            case "json":
                if (t = i.content,
                t = u.ubb.ubb2html(t, {
                    formatTopic: !0,
                    decodeHtml: !0,
                    showAt: !0,
                    formatUrl: !0
                }),
                a && (d.push({
                    content: escHTML(a.content),
                    name: escHTML(s.rt_uinname),
                    uin: s.uin
                }),
                e.rtMood = !0),
                r)
                    for (var l = 0, p = r.length; l < p; l++) {
                        var c = r[l];
                        d.unshift({
                            content: escHTML(c.content),
                            name: escHTML(c.name),
                            uin: c.uin
                        })
                    }
                t += n.getRtHtml(d);
                break;
            case "text":
                t = i
            }
            return t
        },
        editInfo: function(l) {
            var e = trim(l.getContent(!0));
            l.setContent(""),
            F4A.controls.Base.loadDefinition("FriendSelector", {
                version: "2.1",
                nameSpace: "F4A.controls.SensibleEditor.responsors",
                onSuccess: function() {
                    0 < l.getContent(!0).length || setTimeout(function() {
                        var a = []
                          , r = F4A.controls.SensibleEditor.responsors.FriendSelector
                          , d = 0;
                        e.replace(/(?:@\{uin:([\w_]+),nick:([^\}]*?)(?:,who:\d)?\})|[^@]+/g, function(e, t, i, o, n) {
                            var s;
                            return 0 < o - d && l.appendToContent(u.string.htmlDecode(n.substring(d, o))),
                            t ? (t = trim(t),
                            i = (i = u.string.htmlDecode(i)).replace(/\%2C|%25|%7D/g, function(e) {
                                switch (e) {
                                case "%2C":
                                    return ",";
                                case "%25":
                                    return "%";
                                case "%7D":
                                    return "}"
                                }
                                return e
                            }),
                            s = a[t] || i,
                            l.appendToContent(r.createMention({
                                getMemo: function() {
                                    return s
                                },
                                getUin: function() {
                                    return t
                                },
                                getNickname: function() {
                                    return i
                                }
                            }), "node")) : l.appendToContent(u.string.htmlDecode(e)),
                            d = o + e.length,
                            e
                        }),
                        0 < e.length - d && l.appendToContent(u.string.htmlDecode(e.substring(d, e.length)))
                    }, 0)
                }
            })
        },
        dispose: function() {
            this.wrapper.html("");
            var e = h("#js-description")
              , t = h("#js-desc-editor")
              , i = h("#js-sidebar-ctn .js-userinfo-ctn")
              , o = h("#js-sidebar-ctn .handle-tab");
            t.hide(),
            e.show(),
            i.show(),
            o.show(),
            h("#js-cmt-poster-wrapper").removeClass("comment-weak"),
            h("#js-viewer-container #js-interactive-menu").hide(),
            h("#js-viewer-container #js-other-menu").hide()
        }
    }),
    i
}),
define.pack("./init", ["photo.v7/lib/jquery", "photo.v7/lib/photo", "./slide", "./event", "./util", "./tmpl"], function(require, exports, module) {
    var o = require("photo.v7/lib/jquery")
      , n = require("photo.v7/lib/photo")
      , s = require("./slide")
      , a = require("./event")
      , t = require("./util");
    require("./tmpl").PSY = n,
    (window.PSY = n).loadTimes = n.loadTimes || {},
    module.exports = {
        init: function(e) {
            var t, i = o.extend(!0, {}, e);
            e && e.params ? (t = e.params).div = e.div : t = e,
            t && t.pre && t.preEncode && (t.pre = decodeURIComponent(t.pre)),
            n.loadTimes.basejsLoaded = +new Date,
            (window.slide = s)._oriOption = i,
            a.init(),
            t = o.extend({
                appid: 0
            }, t),
            this.fixInputParams(t),
            this.initScript(t)
        },
        initScript: function(e) {
            this.loadjSolution().done(function() {
                n.loadTimes.jSolutionLoaded = +new Date,
                s.init(e)
            }).fail(function() {
                s.init(e)
            })
        },
        loadjSolution: function() {
            var e = o.Deferred();
            return window.requirejSolution ? requirejSolution(function() {
                e.resolve()
            }) : seajs.use("http://" + (n._domains.imgcache || siDomain || "qzs.qq.com") + "/qzone/app/utils/requirejSolution_1.0_qzone.js", function() {
                requirejSolution(function() {
                    e.resolve()
                })
            }),
            e.promise()
        },
        fixInputParams: function(e) {
            (e = e || {}).appid = parseInt(e.appid),
            e.ownerUin = parseInt(e.ownerUin),
            e.topicId = escHTML && escHTML(e.topicId || ""),
            e.picKey = e.picKey && escHTML && escHTML(e.picKey || ""),
            e.pre = encodeURI(e.pre || ""),
            e.pre = t.filterUrlProtocol(e.pre),
            e.url && (e.url = encodeURI(e.url),
            e.url = t.filterUrlProtocol(e.url)),
            e.originUrl && "||" != e.originUrl && (e.originUrl = encodeURI(e.originUrl),
            e.originUrl = t.filterUrlProtocol(e.originUrl)),
            "comment" != e.type || e.picKey || (e.picKey = e.picKey || e.pre),
            4 == e.appid && (e._topicId = e.topicId || "",
            e.topicId = e.albumId || e._topicId.split("_")[0])
        }
    }
}),
define.pack("./like", ["photo.v7/lib/jquery", "./event", "./tmpl", "./util"], function(e, exports, module) {
    var t = e("photo.v7/lib/jquery")
      , i = e("./event")
      , s = (e("./tmpl"),
    e("./util"))
      , n = s.evt
      , e = {};
    return t.extend(e, {
        init: function() {
            this.likeBtn = t("#js-viewer-like"),
            this.likeList = t("#js-like-list"),
            this.bind()
        },
        bind: function() {
            var o;
            this._hasBindEvent || (this._hasBindEvent = !0,
            t("#js-viewer-like").on(n.click, function(e) {
                return e.preventDefault(),
                !1
            }),
            o = this,
            i.bind("go", function(e, t) {
                var i = t.photo;
                if ("comment" == slide.option.type)
                    return !1;
                (202 != slide.option.appid || "album" != slide.option.type && "photo" != slide.option.type || t.first) && o.initUGCLike({
                    photo: i
                })
            }),
            i.bind("close", function() {
                o.dispose()
            }))
        },
        initUGCLike: function(e) {
            var t = e.photo
              , i = this._getLikeConfig(t)
              , e = slide.config.getLikeKey && slide.config.getLikeKey(t)
              , t = t._cacheData || (t._cacheData = this._adaptLikeData(t));
            i.cacheData = t,
            QZONE.FP.addUGCLike.dispose(this.likeBtn[0]),
            this.likeList.html(""),
            e && QZONE.FP.addUGCLike(this.likeBtn[0], {
                curKey: e.curKey,
                uniKey: e.uniKey
            }, i)
        },
        showLikeBtn: function() {
            this.likeBtn.show()
        },
        refreshLikeNum: function(e) {
            this.likeBtn.find(".js-likeable .btn-txt-num").text(0 < e ? "(" + s.formatNum(e) + ")" : "")
        },
        _adaptLikeData: function(e) {
            if (isNaN(e.likeTotal))
                return null;
            for (var t, i = 0, o = [], n = e.likeList || [], s = 0, a = n.length; s < a; s++)
                likeItem = n[s],
                likeItem.uin == QZONE.FP.getQzoneConfig().loginUin ? i = 1 : o.push([likeItem.uin, escHTML(likeItem.nick)]);
            return t = [{
                current: {
                    likedata: {
                        cnt: e.likeTotal,
                        ilike: i,
                        list: o
                    }
                }
            }],
            e._cacheData = t
        },
        _getLikeConfig: function(o) {
            var n = this;
            return {
                template: {
                    checkInnerHtml: !1,
                    keepInSameRow: !0,
                    rewriteWithTemplate: {
                        LOADING: '<a class="qz_like_btn handle-item" href="javascript:void(0)"><i class="icon-m icon-praise-m"></i><span class="btn-txt">赞</span></a>',
                        LIKE_ABLE: '<a class="qz_like_btn handle-item js-likeable" href="javascript:void(0)"><i class="icon-m icon-praise-m"></i><span class="btn-txt">赞</span><span class="btn-txt-num"></span></a>',
                        LIKED: '<a class="qz_like_btn handle-item js-liked" href="javascript:void(0)"><i class="icon-m icon-praise-m"></i><span class="btn-txt">已赞</span></a>',
                        CANCEL_ABLE: '<a class="qz_like_btn handle-item js-like-cancel" href="javascript:void(0)"><i class="icon-m icon-praise-m"></i><span class="btn-txt">已赞</span></a>'
                    },
                    refreshTipBack: function(e, t, i) {
                        try {
                            n.refreshLikeNum(i.cnt),
                            t ? (n.likeList.html(t),
                            n.likeList.prepend('<span class="figure-praise-arr"><span class="mod-arr"></span></span>'),
                            setTimeout(function() {
                                n.likeList.show(),
                                slide.updateScroll()
                            }, 0)) : (n.likeList.html(""),
                            setTimeout(function() {
                                n.likeList.hide()
                            }, 0))
                        } catch (e) {}
                    }
                },
                onNoPermite: function(e, t) {
                    t = t && t.message || "没有权限";
                    QZONE.FP.showMsgbox(t, 1, 2e3)
                },
                onLike: function(e, t) {
                    var i = e._cbData;
                    try {
                        o._cacheData = [{
                            current: {
                                likedata: {
                                    ilike: i.ilike,
                                    cnt: i.cnt,
                                    list: i.list
                                }
                            }
                        }]
                    } catch (e) {}
                    s.stat.pingpv("like")
                },
                onCancelLike: function(e, t) {
                    var i = e._cbData;
                    try {
                        o._cacheData = [{
                            current: {
                                likedata: {
                                    ilike: i.ilike,
                                    cnt: i.cnt,
                                    list: i.list
                                }
                            }
                        }]
                    } catch (e) {}
                    s.stat.pingpv("unlike")
                },
                onCacheData: function() {},
                onGetData: function() {
                    i.trigger("showSideBarButtons")
                },
                btnStyle: 4
            }
        },
        dispose: function() {
            this.likeBtn.hide(),
            this.likeList.html(""),
            this.likeBtn[0] && "" != this.likeBtn[0].innerHTML && (QZONE.FP.addUGCLike.dispose(this.likeBtn[0]),
            this.likeBtn.html(""))
        }
    }),
    e
}),
define.pack("./plugins.collect", ["photo.v7/lib/jquery", "./event", "./util", "photo.v7/lib/photo"], function(require, exports, module) {
    var n = require("photo.v7/lib/jquery")
      , e = require("./event")
      , o = require("./util")
      , t = o.evt
      , s = require("photo.v7/lib/photo")
      , a = window.inqq || o.getParameter("inqq") || !1;
    return n.extend(exports, {
        init: function() {
            this.wrapper = n("#js-sidebar-ctn"),
            this.alive = !0,
            this.btn = this.wrapper.find("#js-btn-collect-li").show(),
            this.bind(),
            this.wrapper.find("#js-btn-collect").html("收藏")
        },
        bind: function() {
            var i;
            this._hasBindEvent || (this._hasBindEvent = !0,
            (i = this).wrapper.delegate("#js-btn-collect", t.click, function(e) {
                var t = n(this);
                return e.preventDefault(),
                -1 == t.html().indexOf("取消") ? (i.collect(),
                o.stat.pingpv("collect")) : (a ? i.delCollect() : QZONE.FP.confirm("收藏", "确认取消这条收藏？", {
                    okfn: i.delCollect,
                    type: 2,
                    icontype: "warn",
                    hastitle: !1,
                    height: 75
                }),
                o.stat.pingpv("delcollect")),
                !1
            }),
            e.bind("close", function() {
                i.dispose()
            }),
            e.bind("go", function(e, t) {
                t.photo.hasCollect ? i.wrapper.find("#js-btn-collect").html("取消收藏") : i.wrapper.find("#js-btn-collect").html("收藏")
            }))
        },
        collect: function() {
            var e, i = this, t = n("#js-thumbList-ctn li.on").attr("data-index"), o = slide.photos[t];
            o && (s.user.getLoginUin() < 1e4 ? QZONE.FP.showLoginBox("photo") : (e = {
                uin: s.user.getLoginUin(),
                owneruin: o.ownerUin,
                fupdate: 1,
                inCharset: "utf-8",
                outCharset: "utf-8",
                id: o.albumId,
                refer: "photoviewer"
            },
            a && (e.refer = "qqclient"),
            4 == (t = o.appid || slide.option.appid) && (e.type = 4,
            "videoandrec" == slide.option.type ? (e.id = o.tid,
            e.urllist = o.subid) : e.urllist = o.picKey),
            311 == t && (e.type = 5,
            "video" == slide.option.type || "videoandrec" == slide.option.type ? e.id = o.topicId || o.tid ? (o.topicId || o.tid) + ".1" : "" : e.id = slide.option.picKey.split(",")[0] + ".1"),
            202 == t && (e.type = 7,
            e.id = o.tid),
            e.id && (t = "https:" === location.protocol ? "https://" + window.g_cgidomain + ".qzone.qq.com/proxy/domain/" : "http://",
            s.ajax.request({
                type: "post",
                requestType: "formSender",
                charsetType: "UTF8",
                url: t + "fav.qzone.qq.com/cgi-bin/add_fav",
                data: e,
                success: function(t) {
                    if (0 == t.code) {
                        if (a)
                            try {
                                1 != window.external.CallHummerApi("Misc.CollectionTipsFromQZone") && QZONE.FP.showMsgbox(t.message, 4, 2e3)
                            } catch (e) {
                                QZONE.FP.showMsgbox(t.message, 4, 2e3)
                            }
                        else
                            QZONE.FP.showMsgbox(t.message, 4, 2e3);
                        i.wrapper.find("#js-btn-collect").html("取消收藏"),
                        o.hasCollect = 1
                    } else
                        QZONE.FP.showMsgbox(t.message, 5, 2e3)
                },
                error: function(e) {
                    QZONE.FP.showMsgbox(e.message, 5, 2e3)
                },
                noCodeDeal: !0,
                timeout: 8e3
            }))))
        },
        delCollect: function() {
            var e, t = n("#js-thumbList-ctn li.on").attr("data-index"), i = slide.photos[t];
            s.user.getLoginUin() < 1e4 ? QZONE.FP.showLoginBox("photo") : (e = {
                uin: s.user.getLoginUin(),
                fupdate: 1,
                inCharset: "utf-8",
                outCharset: "utf-8"
            },
            4 == slide.option.appid && (e.idlist = "2-2-" + s.user.getLoginUin() + "_4_" + i.picKey),
            311 == slide.option.appid && ("video" == slide.option.type || "videoandrec" == slide.option.type ? e.idlist = "2-3-" + s.user.getLoginUin() + "_5_" + (i.topicId || i.tid) + ".1" : e.idlist = "2-3-" + s.user.getLoginUin() + "_5_" + slide.option.picKey.split(",")[0] + ".1"),
            202 == slide.option.appid && (e.idlist = "2-4-" + s.user.getLoginUin() + "_7_" + i.tid),
            t = "https:" === location.protocol ? "https://" + window.g_cgidomain + ".qzone.qq.com/proxy/domain/" : "http://",
            s.ajax.request({
                type: "post",
                requestType: "formSender",
                charsetType: "UTF8",
                url: t + "fav.qzone.qq.com/cgi-bin/del_fav",
                data: e,
                success: function(e) {
                    0 == e.code ? (a || QZONE.FP.showMsgbox(e.message, 4, 2e3),
                    n("#js-sidebar-ctn #js-btn-collect").html("收藏"),
                    i.hasCollect = 0) : QZONE.FP.showMsgbox(e.message, 5, 2e3)
                },
                error: function(e) {
                    QZONE.FP.showMsgbox(e.message, 5, 2e3)
                },
                noCodeDeal: !0,
                timeout: 8e3
            }))
        },
        dispose: function() {
            this.alive = !1,
            this.btn.hide()
        }
    }),
    exports
}),
define.pack("./plugins.cover", ["photo.v7/lib/jquery", "./event", "./util", "photo.v7/lib/photo"], function(require, exports, module) {
    var i = require("photo.v7/lib/jquery")
      , e = require("./event")
      , o = require("./util")
      , n = o.evt
      , s = require("photo.v7/lib/photo");
    return i.extend(exports, {
        init: function() {
            this.wrapper = i("#js-sidebar-ctn"),
            this.alive = !0,
            this.btn = this.wrapper.find("#js-btn-cover-li").show(),
            this.bind()
        },
        bind: function() {
            var t;
            this._hasBindEvent || (this._hasBindEvent = !0,
            (t = this).wrapper.delegate("#js-btn-cover", n.click, function(e) {
                return e.preventDefault(),
                t.setCover(),
                o.stat.pingpv("cover"),
                !1
            }),
            e.bind("close", function() {
                t.dispose()
            }))
        },
        setCover: function() {
            var e = i("#js-thumbList-ctn li.on").attr("data-index")
              , t = slide.photos[e]
              , e = s.user.getLoginUin();
            if (e < 1e4)
                QZONE.FP.showLoginBox("photo");
            else {
                if (t.ownerUin != e)
                    return this.dispose(),
                    !1;
                require.async("photo.v7/common/photoList/ajax.cover", function(e) {
                    e.setCover({
                        lloc: t.lloc,
                        albumId: t.albumId
                    }).fail(function(e) {
                        QZONE.FP.showMsgbox(e.message, 5, 2e3)
                    }).done(function(e) {
                        QZONE.FP.showMsgbox("设置成功！", 4, 2e3)
                    })
                })
            }
        },
        dispose: function() {
            this.alive = !1,
            this.btn.hide()
        }
    }),
    exports
}),
define.pack("./plugins.face", ["photo.v7/lib/jquery", "photo.v7/lib/photo", "./event", "./util", "./tmpl"], function(require, exports, module) {
    var a = require("photo.v7/lib/jquery")
      , s = require("photo.v7/lib/photo")
      , e = require("./event")
      , r = require("./util")
      , d = require("./tmpl")
      , t = {};
    return a.extend(t, {
        init: function() {
            this.faceArea = a("#js-face-area"),
            this.alive = !0,
            this.bind()
        },
        bind: function() {
            var n;
            this._hasBindEvent || 4 != slide.config.appid && 311 != slide.config.appid || "hd" != slide.getMode() && (this._hasBindEvent = !0,
            n = this,
            e.bind("close", function(e) {
                n.dispose()
            }),
            e.bind("updateFaceInfo", function(e) {
                a("#js-viewer-container").is(":hidden") || (a(".j-selector-wrap .js_friendselector_container").hide(),
                n.alive = !0,
                n.index = slide.index,
                n.photo = slide.photos[slide.index],
                n.fadeOut || n.updateFaceInfo())
            }),
            this.faceArea.on("mouseenter", ".j-input-wrap input", function(e) {
                a(e.target).parent().parent().addClass("name-input-focus")
            }),
            this.faceArea.on("mouseleave", ".j-input-wrap input", function(e) {
                a(e.target).parent().parent().removeClass("name-input-focus")
            }),
            this.faceArea.on("click", ".j-input-wrap input", function(e) {
                n.showSelector()
            }),
            a(document).on("click.quanren", function(e) {
                e = a(e.target);
                e.closest(".j-input-wrap").length || e.closest(".j-selector-wrap").length || e.closest(".j-comfirm-no").length || n.friendSelector && (n.friendSelector.hide(),
                a(".j-selector-wrap").hide(),
                a(".j-input-wrap input").val("这是谁？"))
            }),
            this.faceArea.on("click", ".j-comfirm-no", function(e) {
                var t = n.photo
                  , i = n.unconfirm;
                a(".j-unconfirm-wrap").hide(),
                a(".j-unknown-wrap").show(),
                n.unconfirm.recommend_infos = [],
                n.showSelector();
                t = {
                    owner: t.ownerUin || s.user.getOwnerUin(),
                    feed_face_info: {
                        op: 2,
                        faceinfo: a.extend(i, {
                            writeruin: s.user.getLoginUin(),
                            is_recommend: !1
                        }),
                        albumid: t.albumId,
                        photoid: t.lloc,
                        photo_url: t.url,
                        shuoshuo_id: t.topicId || ""
                    }
                };
                n.operateFace(t).done(function(e) {
                    e && e.data && e.data.faceitem ? n.photo.faceList[n.faceIndex] = e.data.faceitem : (n.photo.faceList[n.faceIndex].targetnick = "",
                    n.photo.faceList[n.faceIndex].targetuin = 0)
                }).fail(function(e) {
                    QZONE.FP.showMsgbox(e.msg || "对不起，操作失败", 5, 2e3)
                }),
                r.stat.pingpv("viewer2.face.sayno")
            }),
            this.faceArea.on("click", ".j-comfirm-yes", function(e) {
                var t = n.photo
                  , i = n.unconfirm;
                a(".j-unconfirm-wrap").hide(),
                a(".j-confirm-wrap").show(),
                n.fadeOut = !0,
                n.faceArea.fadeOut(500, function() {
                    n.updateFaceInfo(),
                    n.fadeOut = !1
                });
                var o = i.recommend_infos[0]
                  , t = {
                    owner: t.ownerUin || s.user.getOwnerUin(),
                    feed_face_info: {
                        op: 1,
                        faceinfo: a.extend(i, {
                            targetuin: o.uin,
                            targetnick: o.nick,
                            target_groupid: o.groupid,
                            writeruin: s.user.getLoginUin(),
                            is_recommend: !0
                        }),
                        albumid: t.albumId,
                        photoid: t.lloc,
                        photo_url: t.url,
                        shuoshuo_id: t.topicId || ""
                    }
                };
                n.operateFace(t).done(function(e) {
                    e && e.data && e.data.faceitem ? n.photo.faceList[n.faceIndex] = e.data.faceitem : (n.photo.faceList[n.faceIndex].quanstate = 1,
                    n.photo.faceList[n.faceIndex].writeruin = parseInt(s.user.getLoginUin())),
                    n.updateQuanren()
                }).fail(function(e) {
                    QZONE.FP.showMsgbox(e.msg || "对不起，操作失败", 5, 2e3)
                }),
                r.stat.pingpv("viewer2.face.sayyes")
            }))
        },
        showSelector: function() {
            var i = this
              , o = a(".j-selector-wrap")
              , n = a(".j-input-wrap input");
            function s() {
                var e = a("#js-viewer-container");
                e && (o.css("top", a(".figure-side-wrap").height() + 79 + "px"),
                o.show(),
                o.height() + o.position().top > e.height() && o.css("left", "-58px").css("top", parseInt((e.height() - o.height()) / 2) + "px"))
            }
            i._isSelectorSetup ? i.friendSelector && (i.friendSelector.shotInput(n, function(e) {
                e && 27 == e.keyCode && i.friendSelector.hide()
            }),
            i.friendSelector.show({
                top: 0,
                left: 0,
                width: o.width(),
                position: "relative"
            }),
            i.friendSelector.showList({
                defaultKeyword: "这是谁？"
            }).done(function() {
                n.val(""),
                n.select().focus(),
                s()
            })) : (i._isSelectorSetup = !0,
            require.async("photo.v7/common/friendSelector/index", function(e) {
                var t = new e;
                t.init({
                    isRecentQuan: !1,
                    container: o
                }).done(function() {
                    (i.friendSelector = t).show({
                        top: 0,
                        left: 0,
                        width: o.width(),
                        position: "relative"
                    }),
                    t.showList({
                        defaultKeyword: "这是谁？"
                    }).done(function() {
                        n.val(""),
                        n.select().focus(),
                        s()
                    })
                }),
                t.shotInput(n, function(e) {
                    e && 27 == e.keyCode && t.hide()
                }),
                t.select(function(e) {
                    i.onSelectFriend(e),
                    t.prependRecentQuan([e]),
                    t.hide()
                })
            }))
        },
        onSelectFriend: function(t) {
            var i = this
              , e = i.photo
              , o = i.unconfirm;
            a(".j-confirm-link").attr("href", "http://user.qzone.qq.com/" + t.uin.toString() + "/"),
            a(".j-confirm-link").html(escHTML(s.ubb.ubb2text(t.remark))),
            a(".j-unknown-wrap").hide(),
            a(".j-confirm-wrap").show(),
            i.fadeOut = !0,
            i.faceArea.fadeOut(500, function() {
                i.fadeOut = !1,
                i.updateFaceInfo()
            });
            e = {
                owner: e.ownerUin || s.user.getOwnerUin(),
                feed_face_info: {
                    op: 1,
                    faceinfo: a.extend(o, {
                        targetuin: t.uin || 0,
                        targetnick: t.remark || t.name,
                        target_groupid: o.target_groupid || o.groupid,
                        writeruin: s.user.getLoginUin(),
                        is_recommend: !1
                    }),
                    albumid: e.albumId,
                    photoid: e.lloc,
                    photo_url: e.url,
                    shuoshuo_id: e.topicId || ""
                }
            };
            i.operateFace(e).done(function(e) {
                0 === e.ret ? (e && e.data && e.data.faceitem ? i.photo.faceList[i.faceIndex] = e.data.faceitem : (i.photo.faceList[i.faceIndex].quanstate = 1,
                i.photo.faceList[i.faceIndex].writeruin = parseInt(s.user.getLoginUin()),
                i.photo.faceList[i.faceIndex].targetuin = parseInt(t.uin),
                i.photo.faceList[i.faceIndex].targetnick = s.ubb.ubb2text(t.remark || t.name)),
                i.updateQuanren()) : QZONE.FP.showMsgbox(e.msg || "对不起，操作失败", 5, 2e3)
            }).fail(function(e) {
                QZONE.FP.showMsgbox(e.msg || "对不起，操作失败", 5, 2e3)
            }),
            r.stat.pingpv("viewer2.face.confirm" + (i.pingKey || ""))
        },
        updateQuanren: function() {
            slide.photos[slide.index].browser = 1,
            e.trigger("faceOpDone")
        },
        getFaceRect: function(e, t) {
            return [this.getRealSize(e.width, t.x), this.getRealSize(e.height, t.y), this.getRealSize(e.width, t.w), this.getRealSize(e.height, t.h)].join("_")
        },
        getOper: function(e) {
            return {
                confirm: 0,
                noconfirm: 1,
                sayyes: 2,
                sayno: 3,
                allConfirm: 6
            }[e] || 0
        },
        operateFace: function(e) {
            var t = a.Deferred()
              , i = slide.config.appid
              , o = (e = a.extend({
                feed_face_info: {}
            }, e)).feed_face_info;
            return 4 == i ? e.scene = 3 : 311 == i && (e.scene = 1,
            e.mood_face_info = o),
            s.ajax.request({
                type: "post",
                url: location.protocol + "//h5.qzone.qq.com/webapp/json/qzoneDynamicAlbum/MarkFaceInPhoto",
                data: s.webapp.flatObj(e),
                requestType: "json",
                dataType: "json",
                cache: !1,
                timeout: 8e3,
                scriptCharset: "UTF-8",
                qzoneCoolCbName: !0,
                noCodeDeal: !0,
                noNeedAutoXss: 1,
                reportFrom: "floatview_right",
                success: function(e) {
                    e && e.data && e.data.faceitem ? t.resolve(e) : t.reject(e)
                },
                error: function(e) {
                    t.reject(arguments)
                }
            }),
            t.promise()
        },
        isFriend: function() {
            return !!QZFL.FP.getQzoneConfig("isOwner") || QZFL.FP._t.g_isFriend
        },
        isMarkable: function(e) {
            var t, i, o = slide.config.appid, n = !1;
            return "videoandrec" != slide.config.type && (4 == o ? e && e.ownerUin == s.user.getLoginUin() ? n = !0 : slide.topic && (t = slide.topic.priv,
            i = slide.topic.bitmap,
            n = (1 == t || 4 == t || 6 == t || 8 == t) && !(i && "1" == i.charAt(i.length - 2))) : 311 == o && (n = (e = slide.photos[slide.index]) && 1 == e.who && 1 == e.picmarkEnable),
            n)
        },
        updateFaceInfo: function() {
            var e, t = this.photo, i = a("#js-sidebar-ctn");
            if (t && this.isMarkable(t) && this.isFriend()) {
                if (this.unconfirm = null,
                t.faceList && t.faceList.length) {
                    for (var o = 0, n = t.faceList.length; o < n; o++)
                        if (5 === t.faceList[o].quanstate && 0 !== t.faceList[o].targetuin) {
                            this.unconfirm = t.faceList[o],
                            this.faceIndex = o,
                            this.pingKey = "1";
                            break
                        }
                    if (!this.unconfirm)
                        for (o = 0,
                        n = t.faceList.length; o < n; o++)
                            if (5 === t.faceList[o].quanstate) {
                                this.unconfirm = t.faceList[o],
                                this.faceIndex = o,
                                this.pingKey = "2";
                                break
                            }
                }
                this.unconfirm ? (e = this.getCutUrl(this.trimWebpUrl(t.url), slide.config.face.width, slide.config.face.height, t.width, t.height, this.getRealSize(t.width, this.unconfirm.x), this.getRealSize(t.height, this.unconfirm.y), this.getRealSize(t.width, this.unconfirm.w), this.getRealSize(t.height, this.unconfirm.h)),
                e = d.faceInfo({
                    url: e,
                    photo: t,
                    width: slide.config.face.width,
                    height: slide.config.face.height,
                    ubbUin: s.ubb.ubb2html(this.unconfirm.recommend_infos[0].nick, {
                        from: "nick",
                        decodeHtml: !1
                    }),
                    unconfirm: this.unconfirm
                }),
                this.faceArea.html(e),
                this.faceArea.fadeIn(),
                this.lastPhoto && this.lastPhoto.lloc === t.lloc || (this.lastPhoto = t,
                r.stat.pingpv("viewer2.face.show" + this.pingKey),
                "1" == this.pingKey && (parseInt(t.ownerUin) == parseInt(this.unconfirm.targetuin) ? r.stat.pingpv("viewer2.face.master") : r.stat.pingpv("viewer2.face.unmaster")))) : (this.faceArea.hide(),
                i.trigger("noRcd"))
            } else
                this.faceArea.hide(),
                i.trigger("noRcd")
        },
        trimWebpUrl: function(e) {
            return e && 0 < e.indexOf("?t=5&") ? e = e.replace("?t=5&", "?") : e && 0 < e.indexOf("?t=5") ? e = e.replace("?t=5", "") : e && 0 < e.indexOf("&t=5") && (e = e.replace("&t=5", "")),
            e
        },
        getRealSize: function(e, t) {
            return parseInt(e * t / 1e4)
        },
        getCutUrl: function(e, t, i, o, n, s, a, r, d) {
            var n = Math.min(2.25 * Math.max(r / t, d / i), (2 * Math.min(s, o - s - r) / r + 1) * r / t, (2 * Math.min(a, n - a - d) / d + 1) * d / i, 4)
              , t = t * n
              , n = i * n;
            return s -= (t - r) / 2,
            a -= (n - d) / 2,
            e.replace(/&rf=([^&]+)/, "&rf=cut_$1") + "&cut=" + [Math.floor(s), Math.floor(a), Math.floor(t), Math.floor(n)].join("_")
        },
        dispose: function() {
            this.alive = !1,
            this.faceArea.hide(),
            this.friendSelector && this.friendSelector.hide()
        }
    }),
    t
}),
define.pack("./plugins.fullScreen", ["photo.v7/lib/jquery", "./event", "./util", "./tmpl", "photo.v7/lib/photo"], function(e, exports, module) {
    var r, l = e("photo.v7/lib/jquery"), n = e("./event"), p = e("./util"), t = e("./tmpl"), e = (e("photo.v7/lib/photo"),
    {});
    return l.extend(e, {
        init: function() {
            this.wrapper = l("#js-viewer-container"),
            this.alive = !0,
            this.btn = this.wrapper.find("#js-btn-fullscreen").show(),
            this.bind()
        },
        bind: function() {
            var t;
            this._hasBindEvent || (this._hasBindEvent = !0,
            n.bind("close", function() {
                t.dispose()
            }),
            (t = this).supportFullScreen() ? (this.wrapper.on("end", function(e) {
                p.stat.pingpv("fullscreen-end")
            }),
            this.wrapper.delegate("#js-btn-fullscreen", "click", function(e) {
                return t.openFullScreen(),
                !1
            }),
            this.wrapper.on("click", ".js-exit-fullscreen", function() {
                return t.wrapper.find("#js-fullscreen-wrapper").hide(),
                t.exitFullScreen(),
                p.stat.pingpv("fullscreen-exit"),
                !1
            }),
            this.wrapper.on("click", ".js-pause-fullscreen", function() {
                return t.pause(),
                p.stat.pingpv("fullscreen-pause"),
                !1
            }),
            this.wrapper.on("click", ".js-resume-fullscreen", function() {
                return t.resume(),
                p.stat.pingpv("fullscreen-resume"),
                !1
            }),
            this.wrapper.on("click", ".js-prev-fullscreen", function() {
                return t.prev(),
                !1
            }),
            this.wrapper.on("click", ".js-next-fullscreen", function() {
                return t.next(),
                !1
            }),
            this.wrapper.on("show", "#js-autoplay", function(e) {
                var t = l(this)
                  , i = t.data("tid");
                return t.show(),
                clearTimeout(i),
                i = setTimeout(function() {
                    t.hide()
                }, 3e3),
                t.data("tid", i),
                !1
            }),
            this.wrapper.on("mousemove", function(e) {
                var t = l(this)
                  , i = (t.data("tid"),
                t.find("#js-autoplay"))
                  , t = i.data("curr-xy")
                  , e = [e.clientY, e.clientX].join(",");
                i.data("curr-xy", e),
                e !== t && i.trigger("show")
            })) : t.otherBrower())
        },
        openFullScreen: function() {
            var o, n, s = this, a = slide.photos[slide.index];
            a && (s.initDom(a),
            o = s.wrapper.find("#js-fullscreen-wrapper").show(),
            n = s.wrapper.find("#photo-fullscreen-layer"),
            s.requestFullScreen(o[0], function() {
                var e, t = s.isFullScreenStatus(), i = l("#photo-fullscreen-oper");
                o.find(".js-resume-fullscreen").hide();
                t ? (o.find("#js-autoplay").trigger("show"),
                p.stat.pingpv("fullscreen-show"),
                slide._pauseFullScreen = 0,
                slide._isFullScreen = 1,
                p.imgLoad(a.origin || a.url, function() {
                    s.play(slide.index)
                }),
                l(document).off("keydown.fullscreen").on("keydown.fullscreen", function(e) {
                    e = e.keyCode;
                    return 39 == e ? s.next() : 37 == e ? s.prev() : 32 == e && (i.find(".js-resume-fullscreen").is(":visible") ? s.resume() : s.pause()),
                    !1
                })) : (t = (e = n.find(".js-fullscreen-cont")).find(".js-fullscreen-img"),
                l("#js-autoplay .js-pause-fullscreen").show(),
                o.hide(),
                n.off("webkitTransitionEnd"),
                e.off("webkitTransitionEnd"),
                t.off("webkitTransitionEnd"),
                l(document).off("keydown.fullscreen"),
                slide._isFullScreen = 0,
                o.find("#js-autoplay").hide(),
                o.find(".js-clear-before-close").remove(),
                o.find("#photo-fullscreen-layer .js-fullscreen-img img").hide(),
                e.data("curr-index", ""))
            }))
        },
        play: function(e) {
            var i, o, n, s, a = this, t = slide._pauseFullScreen, r = slide.photos.length, d = e || 0;
            t || p.isFullScreenStatus && (d < 0 && (d = 0),
            r <= d && (d = 0),
            r = slide.photos[d],
            i = l("#photo-fullscreen-layer"),
            o = r.origin || r.url,
            n = i.find(".js-fullscreen-cont"),
            s = n.find(".js-fullscreen-img"),
            n.data("curr-index") !== d && (n.data("curr-index", d),
            p.imgLoad(o, function(e) {
                var t = i.clone();
                t.removeAttr("id").addClass("js-clear-before-close"),
                i.parent().prepend(t),
                i.addClass("js-fullscreen-layer-transition-none"),
                t.off("webkitTransitionEnd").on("webkitTransitionEnd", function(e) {
                    e.target == t[0] && t.remove()
                }),
                setTimeout(function() {
                    n.attr("style", ""),
                    s.attr("style", ""),
                    t.css({
                        opacity: 0
                    }),
                    i.removeClass("js-fullscreen-layer-transition-none"),
                    a._go({
                        cont: n,
                        width: e.width,
                        height: e.height,
                        index: d,
                        url: o
                    })
                }, 0)
            })))
        },
        _go: function(e) {
            var o, n, t, i, s, a;
            p.isFullScreenStatus && (o = this,
            n = e.cont,
            t = e.height,
            i = e.width,
            e.index,
            e = e.url,
            l("#photo-fullscreen-layer"),
            s = o._getPos(n, i, t),
            (a = n.find(".js-fullscreen-img").css({
                height: Math.round(s.targetHeight / s.times),
                width: Math.round(s.targetWidth / s.times),
                left: "50%",
                top: "50%",
                "margin-left": Math.round(-s.targetWidth / 2 - s.targetLeft / s.times),
                "margin-top": Math.round(-s.targetHeight / 2 - s.targetTop / s.times)
            }).show()).find("img").css({
                height: Math.round(s.targetHeight / s.times),
                width: Math.round(s.targetWidth / s.times)
            }).attr("src", e).show(),
            setTimeout(function() {
                var e = s.times || 1;
                a.css("-webkit-transition", "1.2s ease-in-out"),
                a.css("-webkit-transform", "matrix(" + e + ",0,0," + e + "," + s.targetLeft + "," + s.targetTop + ")"),
                o.isFullScreenStatus() && (r = setTimeout(function() {
                    a.trigger("webkitTransitionEnd")
                }, 1250),
                l("#js-btn-nextPhoto").trigger(p.evt.click))
            }, 0),
            a.off("webkitTransitionEnd").on("webkitTransitionEnd", function(e) {
                if (clearTimeout(r),
                e.target == a[0]) {
                    var t = +n.data("curr-index") + 1;
                    if (t >= slide.photos.length)
                        return o.end(),
                        a.trigger("end"),
                        void setTimeout(function() {
                            o.wrapper.trigger("mousemove")
                        }, 100);
                    var e = slide.photos[t].origin || slide.photos[t].url
                      , i = new Date;
                    p.imgLoad(e, function() {
                        var e = new Date - i
                          , e = Math.min(3e3, e);
                        setTimeout(function() {
                            o.play(t)
                        }, 3e3 - e)
                    })
                }
                return !1
            }))
        },
        prev: function() {
            var e = l("#js-fullscreen-wrapper")
              , t = l("#photo-fullscreen-layer").find(".js-fullscreen-cont")
              , i = t.find(".js-fullscreen-img")
              , o = +t.data("curr-index") || 0;
            e.find(".js-resume-fullscreen").hide();
            l("#js-autoplay .js-pause-fullscreen").show(),
            slide._pauseFullScreen = 0,
            t.off("webkitTransitionEnd"),
            t.css("-webkit-transform", window.getComputedStyle(t[0], null).getPropertyValue("-webkit-transform")),
            i.off("webkitTransitionEnd"),
            i.css("-webkit-transform", window.getComputedStyle(i[0], null).getPropertyValue("-webkit-transform")),
            this.play(o - 1)
        },
        next: function() {
            var e = l("#js-fullscreen-wrapper")
              , t = l("#photo-fullscreen-layer").find(".js-fullscreen-cont")
              , i = t.find(".js-fullscreen-img")
              , o = +t.data("curr-index") || 0;
            e.find(".js-resume-fullscreen").hide();
            l("#js-autoplay .js-pause-fullscreen").show(),
            slide._pauseFullScreen = 0,
            t.off("webkitTransitionEnd"),
            t.css("-webkit-transform", window.getComputedStyle(t[0], null).getPropertyValue("-webkit-transform")),
            i.off("webkitTransitionEnd"),
            i.css("-webkit-transform", window.getComputedStyle(i[0], null).getPropertyValue("-webkit-transform")),
            this.play(o + 1)
        },
        end: function() {
            return this.pause()
        },
        pause: function() {
            var e = l("#js-fullscreen-wrapper")
              , t = l("#photo-fullscreen-layer");
            e.find(".js-pause-fullscreen").hide();
            l("#js-autoplay .js-resume-fullscreen").show();
            e = t.find(".js-fullscreen-cont"),
            t = t.find(".js-fullscreen-img");
            e.off("webkitTransitionEnd"),
            e.css("-webkit-transform", window.getComputedStyle(e[0], null).getPropertyValue("-webkit-transform")),
            t.off("webkitTransitionEnd"),
            t.css("-webkit-transform", window.getComputedStyle(t[0], null).getPropertyValue("-webkit-transform")),
            slide._pauseFullScreen = 1
        },
        resume: function() {
            var e = l("#js-fullscreen-wrapper")
              , t = l("#photo-fullscreen-layer");
            e.find(".js-resume-fullscreen").hide();
            l("#js-autoplay .js-pause-fullscreen").show();
            t = t.find(".js-fullscreen-cont"),
            t.find(".js-fullscreen-img"),
            t = ((+t.data("curr-index") || 0) + 1) % slide.photos.length;
            slide._pauseFullScreen = 0;
            slide.photos[t].origin || slide.photos[t].url;
            this.play(t)
        },
        _getPos: function(e, t, i) {
            var o = window.screen.width
              , n = window.screen.height
              , s = 0
              , a = 0
              , r = i
              , d = t;
            return n * t < o * i ? .8 * n < i && (d = (r = n) / i * t) : .8 * o < t && (r = (d = n) / t * i),
            d < o && (a = 0),
            r < n && (s = 0),
            res = {
                times: 1,
                targetTop: Math.round(s),
                targetLeft: Math.round(a),
                targetWidth: Math.round(d),
                targetHeight: Math.round(r)
            },
            res
        },
        initDom: function(e) {
            0 == this.wrapper.find("#photo-fullscreen-layer").length && (e = t.fullScreen(e),
            this.wrapper.append(e)),
            this.initStyle()
        },
        initStyle: function() {
            var e = l("#photo-fullscreen-oper")
              , t = l("#photo-fullscreen-layer")
              , i = .5 * (window.screen.width - e.width());
            e.css({
                bottom: 30,
                left: i
            }),
            t.off("mousemove").on("mousemove", function() {
                e.stop().fadeIn(),
                slide._timeout && clearTimeout(slide._timeout),
                slide._timeout = setTimeout(function() {
                    e.stop().fadeOut()
                }, 3e3)
            })
        },
        requestFullScreen: function(e, t) {
            t && l(document).off("fullscreenchange webkitfullscreenchange mozfullscreenchange") && l(document).on("fullscreenchange webkitfullscreenchange mozfullscreenchange", t),
            e.requestFullScreen ? e.requestFullScreen() : e.webkitRequestFullScreen ? e.webkitRequestFullScreen() : e.mozRequestFullScreen && e.mozRequestFullScreen()
        },
        exitFullScreen: function() {
            var e = document;
            e.exitFullScreen ? e.exitFullScreen() : e.webkitCancelFullScreen ? e.webkitCancelFullScreen() : e.mozCancelFullScreen && e.mozCancelFullScreen(),
            l("#photo-fullscreen-layer").find(".js-fullscreen-cont").data("curr-index", "")
        },
        supportFullScreen: function() {
            var e = document;
            return "fullscreenEnabled"in e || "webkitFullscreenEnabled"in e || "mozFullScreenEnabled"in e || "webkitCancelFullScreen"in e || !1
        },
        isFullScreenStatus: function() {
            var e = document;
            return e.fullscreen || e.webkitIsFullScreen || e.mozFullScreen || !1
        },
        dispose: function() {
            this.alive = !1,
            slide._isFullScreen = 0,
            this.btn.hide(),
            l(document).off("keydown.fullscreen").off("fullscreenchange webkitfullscreenchange mozfullscreenchange")
        },
        otherBrower: function() {
            var i, o = l("#js-btn-nextPhoto");
            this.wrapper.delegate("#js-btn-fullscreen", "click", function(e) {
                return n.trigger("enterHDMode"),
                i = setInterval(function() {
                    var e = slide.photos.length - 1
                      , t = slide.getMode();
                    slide.index < e && "hd" == t ? o.trigger(p.evt.click) : (slide.index == e && "hd" == t && o.trigger("click"),
                    clearInterval(i))
                }, 3e3),
                !1
            })
        }
    }),
    e
}),
define.pack("./plugins.h5Video", ["photo.v7/lib/jquery", "v8/ic/videoManager/videoUtil", "hybridPath/common/videoPlayer/index", "hybridPath/common/videoPlayer/lib/video/PCTxVideo/index", "hybridPath/common/videoPlayer/lib/video/HlsVideo/index", "./event", "./util", "./tmpl"], function(require, exports, module) {
    var u = require("photo.v7/lib/jquery")
      , m = (require("v8/ic/videoManager/videoUtil"),
    require("hybridPath/common/videoPlayer/index"))
      , g = require("hybridPath/common/videoPlayer/lib/video/PCTxVideo/index")
      , f = require("hybridPath/common/videoPlayer/lib/video/HlsVideo/index");
    require("./event"),
    require("./util"),
    require("./tmpl");
    module.exports = {
        createPlayer: function(e, t, i, o, n) {
            var s = e.currVideo.videoInfo.videoType
              , a = e.currVideo.videoInfo.videoSrc;
            n = n || {},
            u("#js-image-ctn").append('<div class="js-video-flash-ctn" id="' + t + 'Ctn" style="position:absolute;top:-3px;left:-3px;width:3px;height:3px;z-index:10;"></div>');
            for (var r = o.split("&"), d = {}, l = 0; l < r.length; l++) {
                var p = r[l].split("=");
                d[p[0]] = p[1]
            }
            function c(e, t) {
                for (var i = (e = e || "").split("."), o = window, n = 0; n < i.length; n++)
                    "object" == typeof o[i[n]] ? o = o[i[n]] : "function" == typeof o[i[n]] && o[i[n]](t)
            }
            g && m.registerVideo("TxVideo", g),
            f && m.registerVideo("HlsVideo", f);
            var h = m({
                container: u("#" + t + "Ctn").get(0),
                src: 2 === s ? null : a,
                width: "100%",
                height: "100%",
                controls: !0,
                autoplay: !1,
                vid: n.vid,
                volume: .5,
                isTxVideo: t === e._txVideoFlashId,
                isHlsVideo: t === e._hlsVideoFlashId
            });
            return u(h.container).attr("id", t),
            u(h.container).on("dblclick", function() {
                h.isFullScreen() ? h.exitFullscreen() : h.requestFullscreen()
            }),
            h.cache = {},
            h.container.setUrl = function(e, t) {
                h.src(t && t.vurlBak || e)
            }
            ,
            h.container.loadAndPlayVideoV2 = function(e) {
                h.currentTime(e.t),
                h.play({
                    vid: e.vid,
                    connectionPlayTime: e.t
                })
            }
            ,
            h.container.pauseVideo = function() {
                h.pause()
            }
            ,
            h.container.stopVideo = function() {
                h.pause()
            }
            ,
            h.container.getDuration = function() {
                return h.duration()
            }
            ,
            h.container.getPlaytime = function() {
                return h.currentTime()
            }
            ,
            h.container.setPlaytime = function(e) {
                h.currentTime(e)
            }
            ,
            h.container.playVideo = function(e) {
                h.currentTime(e),
                h.play()
            }
            ,
            h.container.showPopup = function() {}
            ,
            h.container.showViewMore = function() {}
            ,
            h.container.dispose = function() {
                h.dispose()
            }
            ,
            setTimeout(function() {
                c(d.onFlashInited)
            }, 0),
            h.on("loadedmetadata", function() {
                c(d.onMetaData, {
                    width: this.width(),
                    height: this.height()
                })
            }),
            h.on("play", function() {
                h.cache.hasVideoPlayed || (h.cache.hasVideoPlayed = !0,
                c(d.buffering)),
                h.cache.hasVideoStarted ? c(d.onChangeState, "playing") : c(d.onChangeState, "buffering")
            }),
            h.on("pause", function() {
                c(d.onChangeState, "pause")
            }),
            h.on("playing", function() {
                h.cache.hasVideoStarted || (h.cache.hasVideoStarted = !0,
                c(d.onPlayStart),
                c(d.onChangeState, "playing"))
            }),
            h.on("ended", function() {
                h.cache.hasVideoStarted && (c(d.onChangeState, "ended"),
                c(d.onPlayStop)),
                h.cache.hasVideoPlayed = !1,
                h.cache.hasVideoStarted = !1
            }),
            h.on("seeking", function() {
                c(d.onSlideStart)
            }),
            h.on("seeked", function() {
                c(d.onSlideStop)
            }),
            h.on("error", function() {
                c(d.onError, h.videoTag().error.code, h.videoTag().error.message)
            }),
            h.container
        }
    }
}),
define.pack("./plugins.infoBar", ["photo.v7/lib/jquery", "./event", "./util", "./tmpl", "./api.photos"], function(e, exports, module) {
    var n = e("photo.v7/lib/jquery")
      , s = e("./event")
      , a = e("./util")
      , o = e("./tmpl")
      , t = a.evt
      , e = (e("./api.photos"),
    {});
    return n.extend(e, {
        init: function() {
            this.wrapper = n("#js-ctn-infoBar"),
            this.alive = !0,
            this.bind()
        },
        bind: function() {
            var o;
            this._hasBindEvent || (this._hasBindEvent = !0,
            o = this,
            s.bind("go", function(e, t) {
                if (o.alive) {
                    if ("comment" == slide.option.type)
                        return n("#js-ctn-infoBar").hide(),
                        !1;
                    var i = t.photo
                      , t = i.owner == QZONE.FP.getQzoneConfig().loginUin;
                    o.isOwner = t,
                    o.render({
                        photo: i,
                        isOwner: t
                    })
                }
            }),
            s.bind("close", function() {
                o.dispose()
            }),
            this.wrapper.delegate(".js-desc-ctn", "mouseenter", function() {
                o.isOwner && n(this).addClass("show-desc-hover")
            }).delegate(".js-desc-ctn", "mouseleave", function() {
                n(this).removeClass("show-desc-hover")
            }).delegate(".js-desc-ctn", t.click, function() {}),
            this.wrapper.delegate("a.js-expand", t.click, function() {
                a.stat.pingpv("photoname")
            }),
            this.wrapper.delegate("a.js-album-name", t.click, function() {
                a.stat.pingpv("photoname")
            }))
        },
        render: function(e) {
            var t = e.photo
              , i = t.descHtml
              , e = escHTML(t.name);
            this.isOwner && !i && (i = "点击添加描述"),
            e = e.replace(/\<a[^\>]*\>([^\<]*)\<\/a\>/gi, "$1").replace(/\<img[^\>]*\/?\>/gi, ""),
            this.wrapper.html(o.infoBar({
                util: a,
                uploadTime: n.trim(t.uploadTime).split(/\s+/)[0],
                photo: t,
                nameTitle: e,
                desc: i
            })).show(),
            t.name && /[\u4E00-\u9FA5]/g.test(t.name) ? this.wrapper.removeClass("figure-desc-empty") : this.wrapper.addClass("figure-desc-empty"),
            s.trigger("infoBarDone")
        },
        dispose: function() {
            this.alive = !1,
            this.wrapper.html("").hide()
        },
        loadFriendSelector: function() {
            var t = n.Deferred();
            return j$.load({
                id: "/f4a/lite:1.3",
                onSuccess: function(e) {
                    seajs.use("http://" + (siDomain || "qzonestyle.gtimg.cn") + "/qzone/app/controls/sensibleEditor/sensibleEditor_2.1.js", function() {
                        F4A.controls.Base.loadDefinition("FriendSelector", {
                            version: "2.1",
                            nameSpace: "F4A.controls.SensibleEditor.responsors",
                            onSuccess: function() {
                                t.resolve()
                            }
                        })
                    })
                }
            }),
            t
        }
    }),
    e
}),
define.pack("./plugins.lbs", ["photo.v7/lib/jquery", "./event", "./util", "photo.v7/lib/photo", "./tmpl"], function(require, exports, module) {
    var s = require("photo.v7/lib/jquery")
      , t = require("./event")
      , a = require("./util")
      , r = (require("photo.v7/lib/photo"),
    require("./tmpl"))
      , i = a.evt;
    return {
        init: function() {
            this.wrapperMain = s("#js-viewer-main"),
            this.wrapper = s("#js-sidebar-ctn"),
            this.alive = !0,
            this.bind()
        },
        bind: function() {
            var e;
            this._hasBindEvent || (slide.getMode(),
            this._hasBindEvent = !0,
            (e = this).wrapper.on(i.click, "#js-btn-poi .place-name", function(e) {
                var t = s(this)
                  , i = {}
                  , o = {}
                  , n = t.attr("data-pos").split(",");
                e.preventDefault(),
                a.stat.pingpv("lbs-map"),
                s("#js-info-lbs-map").remove(),
                i.pos_x = n[0],
                i.pos_y = n[1],
                o.top = t.offset().top + t.height() + 6,
                o.left = t.offset().left - 250,
                o = r.info_lbs_map({
                    lbs: i,
                    offset: o
                }),
                s("body").append(o)
            }),
            e.wrapperMain.on("mousedown", function(e) {
                s(this);
                setTimeout(function() {
                    0 === s(e.target).closest("#js-btn-poi").size() && s("#js-info-lbs-map").remove()
                }, 0)
            }),
            s(window).on("resize.viewer2-lbs", function() {
                s("#js-info-lbs-map").remove()
            }),
            t.bind("last2first", function() {
                s("#js-info-lbs-map").remove()
            }),
            t.bind("go", function() {
                s("#js-info-lbs-map").remove()
            }),
            t.bind("close", function() {
                s("#js-info-lbs-map").remove(),
                e.dispose()
            }))
        },
        dispose: function() {
            s("#js-info-lbs-map").remove(),
            s(window).off("resize.viewer2-lbs")
        }
    }
}),
define.pack("./plugins.mainShow", ["photo.v7/lib/jquery", "./event", "./util", "photo.v7/lib/photo"], function(require, exports, module) {
    var i = require("photo.v7/lib/jquery")
      , e = require("./event")
      , o = require("./util")
      , n = o.evt
      , s = require("photo.v7/lib/photo");
    return i.extend(exports, {
        init: function() {
            this.wrapper = i("#js-sidebar-ctn"),
            this.alive = !0,
            this.btn = this.wrapper.find("#js-btn-qzone-cover-li").show(),
            this.bind()
        },
        bind: function() {
            var t;
            this._hasBindEvent || (this._hasBindEvent = !0,
            (t = this).wrapper.delegate("#js-btn-qzone-cover", n.click, function(e) {
                return e.preventDefault(),
                QZONE.FP.confirm("主页展示设置", "确定要在您的空间主页展示该照片？<br>请注意：主页必须添加了相册模块才能展示出来。", {
                    okfn: t.setMainShow,
                    type: 2,
                    icontype: "help",
                    hastitle: !0,
                    height: 75
                }),
                o.stat.pingpv("mainShow"),
                !1
            }),
            e.bind("close", function() {
                t.dispose()
            }))
        },
        setMainShow: function() {
            var e = i("#js-thumbList-ctn li.on").attr("data-index")
              , t = slide.photos[e]
              , e = s.user.getLoginUin();
            if (e < 1e4)
                QZONE.FP.showLoginBox("photo");
            else {
                if (t.ownerUin != e)
                    return this.dispose(),
                    !1;
                require.async("photo.v7/common/photoList/ajax", function(e) {
                    e.getRoute({
                        hostUin: s.user.getOwnerUin()
                    }).done(function(e) {
                        s.ajax.request({
                            type: "post",
                            url: "https://" + location.hostname + "/cgi-bin/common/cgi_set_usercover_v2",
                            data: {
                                albumId: t.albumId,
                                lloc: t.lloc,
                                effect: 0,
                                uin: s.user.getLoginUin(),
                                hostUin: s.user.getOwnerUin(),
                                plat: "qzone",
                                format: "fs",
                                appid: 4,
                                notice: 0,
                                source: "qzone",
                                inCharset: "gbk",
                                outCharset: "gbk"
                            },
                            requestType: "formSender",
                            charsetType: "GBK",
                            success: function(e) {
                                0 === e.code ? QZONE.FP.showMsgbox("主页展示设置成功!", 4, 2e3) : QZONE.FP.showMsgbox("设置失败，请稍后重试!", 3, 2e3)
                            },
                            error: function(e) {
                                QZONE.FP.showMsgbox("设置失败，请稍后重试!", 3, 2e3)
                            }
                        })
                    })
                })
            }
        },
        dispose: function() {
            this.alive = !1,
            this.btn.hide()
        }
    }),
    exports
}),
define.pack("./plugins.meihua", ["photo.v7/lib/jquery", "./event", "./util", "photo.v7/lib/photo"], function(require, exports, module) {
    var r = require("photo.v7/lib/jquery")
      , e = require("./event")
      , d = require("./util")
      , i = d.evt
      , o = require("photo.v7/lib/photo")
      , t = {};
    return r.extend(t, {
        init: function() {
            this.wrapper = r("#js-sidebar-ctn"),
            this.alive = !0,
            this.btn = this.wrapper.find("#js-btn-meihua-li").show(),
            this.bind()
        },
        bind: function() {
            var t;
            this._hasBindEvent || (this._hasBindEvent = !0,
            (t = this).wrapper.delegate("#js-btn-meihua", i.click, function(e) {
                return e.preventDefault(),
                t.openMeihua(),
                d.stat.pingpv("meihua"),
                !1
            }),
            e.bind("close", function() {
                t.dispose()
            }))
        },
        trimWebPurl: function(e) {
            return e && 0 < e.indexOf("?t=5&") ? e = e.replace("?t=5&", "?") : e && 0 < e.indexOf("?t=5") ? e = e.replace("?t=5", "") : e && 0 < e.indexOf("&t=5") && (e = e.replace("&t=5", "")),
            e
        },
        openMeihua: function() {
            var s = this
              , e = r("#js-thumbList-ctn li.on").attr("data-index")
              , a = slide.photos[e]
              , e = o.user.getLoginUin();
            if (e < 1e4)
                QZONE.FP.showLoginBox("photo");
            else {
                if (a.ownerUin != e)
                    return this.dispose(),
                    !1;
                var e = slide.topic
                  , t = (e.bitmap,
                {});
                require.async("photo.v7/common/photoList/ajax", function(e) {
                    e.getRoute({
                        hostUin: o.user.getOwnerUin()
                    }).done(function(e) {
                        e = e[e.domain.default];
                        t.del_cgi = "http://" + e.nu + "/cgi-bin/common/cgi_delpic_multi_v2"
                    })
                }),
                t.del_data = {
                    albumname: e.topicName,
                    bgid: "",
                    codelist: s._getCodelist(a),
                    ismultiup: 0,
                    newcover: "",
                    nvip: QZFL.FP.getVipStatus() ? 0 : 1,
                    priv: e.priv,
                    resetcover: 1,
                    tpid: "",
                    inCharset: "gbk",
                    outCharset: "gbk"
                };
                e = a.shootTime || "";
                e && (a.rawshoottime = d.formatTime(e)),
                t.photo = a,
                t.lloc = a.lloc,
                t.name = a.name,
                t.origin_height = a.origin_height || a.originHeight,
                a.origin && (t.origin_upload = 1,
                t.origin_url = s.trimWebPurl(a.origin_url || a.origin)),
                t.origin_width = a.origin_width || a.originWidth,
                t.albumid = a.albumId,
                t.uploadtime = a.uploadtime || a.uploadTime,
                t.pre = s.trimWebPurl(a.pre),
                t.raw_upload = a.raw_upload || 0,
                t.desc = "",
                t.forum = a.forum || 0,
                t.needUpload = !0,
                t.uploadAlbum = "same",
                t.tag = "",
                "undefined" == typeof QPHOTO || void 0 === QPHOTO.dialog ? seajs.use(["http://" + (siDomain || "qzonestyle.gtimg.cn") + "/qzone/client/photo/pages/qzone_v4/script/photo_logic.js", "http://" + (siDomain || "qzonestyle.gtimg.cn") + "/qzone/photo/zone/new/script/photoEditor.js"], function() {
                    QZFL.object.extend(t, {
                        title: "照片美化",
                        mode: "entire",
                        type: "link",
                        speedPoints: {},
                        allowShare: !0,
                        replaceOption: !0,
                        onSave: function(e) {
                            var t, i, o, n;
                            e && 0 == e.ret && (e.reportData && e.reportData.replace && (t = e.pre,
                            i = e.url,
                            o = e.lloc,
                            (n = slide.photos[slide.index]).pre = t,
                            n.url = i,
                            n.lloc = o,
                            e.origin_url && (n.origin = e.origin_url,
                            n.originHeight = e.origin_height,
                            n.originWidth = e.origin_width,
                            r("#js-link-hd a").attr("href", n.origin)),
                            d.imgLoad(i, function() {
                                r("#js-img-disp").attr("src", i)
                            }),
                            d.imgLoad(n.pre, function() {
                                r("#js-thumbList-ctn li.on img").attr("src", n.pre)
                            })),
                            e.reportData && e.reportData.share && s.share(a, e))
                        },
                        onCancel: function(e) {}
                    }),
                    QPHOTO.dialog.editor.openMeihua(t)
                }) : (QZFL.object.extend(t, {
                    title: "照片美化",
                    mode: "entire",
                    type: "link",
                    speedPoints: {},
                    allowShare: !0,
                    replaceOption: !0,
                    onSave: function(e) {
                        var t, i, o, n;
                        e && 0 == e.ret && (e.reportData && e.reportData.replace && (t = e.pre,
                        i = e.url,
                        o = e.lloc,
                        (n = slide.photos[slide.index]).pre = t,
                        n.url = i,
                        n.lloc = o,
                        e.origin_url && (n.origin = e.origin_url,
                        n.originHeight = e.origin_height,
                        n.originWidth = e.origin_width,
                        r("#js-link-hd a").attr("href", n.origin)),
                        d.imgLoad(i, function() {
                            r("#js-img-disp").attr("src", i)
                        }),
                        d.imgLoad(n.pre, function() {
                            r("#js-thumbList-ctn li.on img").attr("src", n.pre)
                        })),
                        e.reportData && e.reportData.share && s.share(a, e))
                    }
                }),
                QPHOTO.dialog.editor.openMeihua(t))
            }
        },
        _getCodelist: function(e) {
            return [e.lloc, e.picrefer || "", this._parseTime(e.uploadtime || e.uploadTime), e.forum, e.shorturl ? r.trim(e.shorturl) : "", e.sloc, e.phototype, 1 == e.origin ? 1 : 0].join("|")
        },
        _parseTime: function(e) {
            for (var t = e.split(/\-|\s|\:/), i = 0; i < 6; i++)
                "number" != typeof (t[i] = parseInt(t[i], 10)) && (t[i] = 1);
            e = new Date(t[0],t[1] - 1,t[2],t[3],t[4],t[5]);
            return Math.round(e.getTime() / 1e3)
        },
        share: function(e, t) {
            var i = slide.topic;
            if (QZONE.FP.getQzoneConfig().loginUin < 1e4)
                return QZONE.FP.showLoginBox("photo"),
                void (window.LoginBack = function() {
                    QZONE.FP.getQzoneConfig().loginUin,
                    QZONE.FP.getQzoneConfig().ownerUin
                }
                );
            function o() {
                require.async("app/v8/controls/forward_box/facade", function(e) {
                    e.bootstrap({
                        dialogTitle: "分享到",
                        fwdtype: 0,
                        source: "",
                        isSignIn: !0,
                        hasToWeibo: !0,
                        origInfo: {
                            rtUin: i.ownerUin,
                            rtTid: t.albumid + ":" + t.lloc
                        },
                        subinfo: {
                            tid: t.albumid + ":" + t.lloc,
                            uin: i.ownerUin,
                            type: "picture",
                            scope: 0
                        },
                        onForwardSuccess: function() {}
                    })
                })
            }
            0 == 4 * QZONE.FP.getBitMapFlag(11) + 2 * QZONE.FP.getBitMapFlag(10) + QZONE.FP.getBitMapFlag(9) ? o() : (e = 5 < (e = e.name).length ? e.substr(0, 5) + "..." : e,
            QZONE.FP.confirm("温馨提示", "当前空间不是对所有人公开的，你确认要将照片《" + e + "》分享给朋友们吗？", o, QZFL.emptyFn))
        },
        _charTrim: function(e, t, i) {
            var o = Math.floor(t / 2);
            if (t && getRealLen(e) > t) {
                for (var n = e.substr(0, o), s = (getRealLen(n),
                e.substr(o).split("")), a = s.length, r = 0; r < a; r++) {
                    if (getRealLen(n + s[r]) > t)
                        return i ? n.substring(0, n.length - 1) + "..." : n;
                    n += s[r]
                }
                return i ? n.substring(0, n.length - 1) + "..." : n
            }
            return e
        },
        dispose: function() {
            this.alive = !1,
            this.btn.hide()
        }
    }),
    t
}),
define.pack("./plugins.moreOper", ["photo.v7/lib/jquery", "./event", "./util", "./thumbNail", "./tmpl", "./api.photos"], function(require, exports, module) {
    var p = require("photo.v7/lib/jquery")
      , i = require("./event")
      , n = require("./util")
      , d = require("./thumbNail")
      , c = require("./tmpl")
      , h = require("./api.photos")
      , u = n.evt
      , e = {};
    return p.extend(e, {
        init: function() {
            this.wrapper = p("#js-sidebar-ctn"),
            this.alive = !0,
            this.btn = this.wrapper.find("#js-btn-moreOper").show(),
            this.bind()
        },
        bind: function() {
            var a, e, t;
            this._hasBindEvent || (this._hasBindEvent = !0,
            a = this,
            i.bind("go", function(e, t) {
                var i = t.photo;
                p("#js-btn-downloadPhoto").attr("data-downloadtype", ""),
                "video" == slide.option.type || "videoandrec" == slide.option.type || i && "video" == i.ugcType ? (p("#js-btn-downloadPhoto").attr("data-downloadtype", "video").text("下载视频"),
                t = window.inqq || n.getParameter("inqq") || !1,
                i && 1 == i.videoType && !t ? p("#js-btn-downloadPhoto-li").show() : p("#js-btn-downloadPhoto-li").hide()) : (p("#js-btn-downloadPhoto").attr("data-downloadtype", "photo"),
                i && 1 == i.raw_upload ? p("#js-btn-downloadPhoto").text("下载原图") : p("#js-btn-downloadPhoto").text("下载图片"),
                p("#js-btn-downloadPhoto-li").show()),
                i.isFamous ? (p("#js-btn-follow-li").show(),
                i.hasFollowed ? p("#js-btn-follow").text("取消关注") : p("#js-btn-follow").text("关注")) : (p("#js-btn-follow-li").hide(),
                p("#js-btn-follow").text("")),
                i && "video" == i.ugcType ? p("#js-other-menu .js-hide-when-video").each(function(e, t) {
                    var i = p(t)
                      , t = "none" == t.style.display ? -1 : 1;
                    i.attr("data-orivisible", t),
                    i.hide()
                }) : p("#js-other-menu .js-hide-when-video").each(function(e, t) {
                    var i = p(t)
                      , t = parseInt(i.attr("data-orivisible"));
                    0 < t ? i.show() : t < 0 && i.hide()
                })
            }),
            this.wrapper.delegate("#js-btn-movePhoto", u.click, function(e) {
                e.preventDefault();
                return a.movePhoto({}),
                n.stat.pingpv("move"),
                !1
            }),
            this.wrapper.delegate("#js-btn-sharePhoto", u.click, function(e) {
                return e.preventDefault(),
                a.sharePhoto(),
                n.stat.pingpv("share"),
                !1
            }),
            p("#js-btn-delPhoto").on(u.click, function() {
                return "videoandrec" == slide.option.type || ("video" == slide.option.type ? a.delVideo() : a.delPhoto()),
                n.stat.pingpv("delete"),
                !1
            }),
            p("#js-btn-downloadPhoto").on(u.click, function() {
                console.log("");
                var e, t;
                return "video" == p(this).attr("data-downloadtype") ? a.downloadVideo() : (e = slide.index,
                t = {},
                1 == (e = slide.photos[e]).raw_upload ? t = p.extend({
                    type: "raw"
                }, t) : e.origin && (t = p.extend({
                    type: "origin"
                }, t)),
                a.downloadPhoto(t)),
                !1
            }),
            p("#js-btn-follow").on(u.click, function() {
                return p(".js-userinfo-ctn .js-btn-follow").trigger("click"),
                !1
            }),
            p("#js-sidebar-ctn").on(u.click, ".open-meitu", function() {
                return a.editPhotoWithMeitu(),
                n.stat.pingpv("meituxiuxiu"),
                !1
            }),
            p("#js-figure-area").on(u.click, ".open-kadang", function() {
                return a.openKadang(),
                !1
            }),
            p("#js-figure-area").on(u.click, ".open-yinxiangpai", function() {
                return a.openYinxiangpai(),
                !1
            }),
            p("#js-figure-area").on(u.click, ".open-leyin", function() {
                return a.openLeyin(),
                !1
            }),
            p("#js-figure-area").on(u.click, ".open-aichongyin", function() {
                return a.openAichongyin(),
                !1
            }),
            p("#js-btn-copyAddress").on(u.click, function() {
                return seajs.use("photo.v7/common/dialog/dialog", function(e) {
                    e.open({
                        title: "复制地址",
                        content: c.copyAddress(),
                        width: 540,
                        height: 246,
                        onLoad: function() {
                            var l = p("#photo-copy-address")
                              , t = l.find(".mod-innerlinks")
                              , i = l.find(".mod-outlinks")
                              , e = slide.getMode() || "normal"
                              , o = slide.photos[slide.index]
                              , n = o.url;
                            "full" != e && "hd" != e || (n = o.origin || n),
                            l.find("#curr-pic-link").val(n);
                            var e = slide.topic.topicId
                              , s = slide.index
                              , o = slide.photos[s].lloc
                              , n = slide.photos[s].ownerUin;
                            l.find("#curr-page-url").val("http://user.qzone.qq.com/" + n + "/photo/" + e + "/" + o + "/"),
                            l.on(u.click, "a.bt-layer-cancel", function() {
                                return QZFL.dialog.getCurrentDialog().unload(),
                                !1
                            }),
                            l.on("keydown", function(e) {
                                e.stopPropagation()
                            }),
                            l.on(u.click, "input", function() {
                                return p(this).select(),
                                !1
                            }),
                            l.on(u.click, "a.copy-link", function() {
                                var e = p(this).prev().val();
                                return e && a.copy(p(this), e),
                                !1
                            });
                            o = slide.photos[slide.index].ownerUin;
                            if (QZONE.FP.getQzoneConfig().loginUin != o)
                                return t.siblings(".copy-tabs").hide(),
                                p("#curr-short-link").parent().hide(),
                                setTimeout(function() {
                                    QZFL.dialog.getCurrentDialog().setSize(l.width(), l.height())
                                }, 0),
                                !1;
                            l.find(".copy-tabs a").on(u.click, function() {
                                var e = p(this);
                                return e.addClass("tab-selected").siblings().removeClass("tab-selected"),
                                e.hasClass("inner-links") ? (t.show(),
                                i.hide(),
                                l.find(".copylink-error").hide()) : e.hasClass("out-links") && (t.hide(),
                                a.initYellowLink(l)),
                                !1
                            }),
                            l.on(u.click, "a.modify-setting", function() {
                                var e, t = p(this);
                                l.find(".modify-setting").siblings("p");
                                return t.hasClass("show-add-setting") ? (t.removeClass("show-add-setting"),
                                t.siblings(".panel-link").hide(),
                                t.siblings(".hint-tip").hide()) : (t.addClass("show-add-setting"),
                                t.siblings(".panel-link").show(),
                                0 == (e = t.siblings(".panel-link-lists")).find("li").length && (t.siblings(".hint-tip").show(),
                                e.hide())),
                                QZFL.dialog.getCurrentDialog().setSize(l.width(), l.height()),
                                !1
                            }),
                            l.on(u.click, "#add-outlink-input", function(e) {
                                var t = p(this)
                                  , i = p.trim(t.val());
                                return i && "http://" != i ? e.preventDefault() : setTimeout(function() {
                                    t.val("http://")
                                }, 0),
                                !1
                            }),
                            l.on(u.click, ".edit-outlink", function(e) {
                                var t = p(this)
                                  , i = p("#add-outlink-input")
                                  , o = t.parent().siblings(".single-link-info").text();
                                i.val(o).focus();
                                t = t.parents("li");
                                return 0 == t.siblings().length ? (p(".hint-tip").show(),
                                t.parent().hide()) : a.updateSettingsText(l),
                                t.remove(),
                                !1
                            }),
                            l.on(u.click, ".del-outlink", function(e) {
                                p(this).parents("li").remove();
                                var t = l.find(".panel-link-lists li p.single-link-info")
                                  , i = [];
                                t.each(function() {
                                    i.push(p(this).text())
                                });
                                var o = i.length
                                  , n = {
                                    inCharset: "gbk",
                                    outCharset: "gbk",
                                    hostUin: QZONE.FP.getQzoneConfig().loginUin,
                                    notice: 0,
                                    format: "fs",
                                    plat: "qzone",
                                    source: "qzone",
                                    appid: 4,
                                    uin: QZONE.FP.getQzoneConfig().loginUin,
                                    dnum: o,
                                    checkdomain: 0 == o ? 0 : 1
                                };
                                if (0 < o)
                                    for (var s = 0; s < o; s++)
                                        n["domain" + s] = i[s];
                                return h.setYurl(n).done(function(e) {
                                    0 == o && (l.find(".hint-tip").show(),
                                    l.find(".panel-link-lists").hide()),
                                    QZFL.dialog.getCurrentDialog().setSize(l.width(), l.height())
                                }).fail(function() {
                                    QZONE.FP.showMsgbox("删除外链引用网站失败，请稍后再试", 3, 2e3)
                                }),
                                !1
                            }),
                            l.on(u.click, "#detail-outlink", function(e) {
                                var t = p(this);
                                return t.hide(),
                                t.parent().siblings("p").show(),
                                QZFL.dialog.getCurrentDialog().setSize(l.width(), l.height()),
                                !1
                            }),
                            l.on(u.click, "#add-outlink-btn", function(e) {
                                var i = p(this)
                                  , o = p.trim(i.prev().val())
                                  , t = l.find(".panel-link-lists li p.single-link-info")
                                  , n = [];
                                t.each(function() {
                                    n.push(p(this).text())
                                });
                                var s = n.length;
                                if (o && "http://" != o) {
                                    if (3 < ++s)
                                        return QZONE.FP.showMsgbox("目前只能设置3个外链网站哦", 3, 2e3),
                                        !1;
                                    var a = {
                                        inCharset: "gbk",
                                        outCharset: "gbk",
                                        hostUin: QZONE.FP.getQzoneConfig().loginUin,
                                        notice: 0,
                                        format: "fs",
                                        plat: "qzone",
                                        source: "qzone",
                                        appid: 4,
                                        uin: QZONE.FP.getQzoneConfig().loginUin,
                                        dnum: s,
                                        checkdomain: 1
                                    };
                                    if (0 < s)
                                        for (var r = 0; r < s; r++) {
                                            var d = "domain" + r;
                                            a[d] = n[r],
                                            r == s - 1 && (a[d] = o)
                                        }
                                    h.setYurl(a).done(function(e) {
                                        var t;
                                        0 == e.code ? (t = c.singleLink(o),
                                        l.find(".panel-link-lists").show().append(t),
                                        l.find(".hint-tip").hide(),
                                        i.prev().val(""),
                                        QZFL.dialog.getCurrentDialog().setSize(l.width(), l.height())) : QZONE.FP.showMsgbox(e.message || "添加外链引用网站失败，请稍后再试", 3, 2e3)
                                    }).fail(function() {
                                        QZONE.FP.showMsgbox("添加外链引用网站失败，请稍后再试", 3, 2e3)
                                    })
                                }
                                return !1
                            }),
                            l.find("#get-short-link").click(function() {
                                return a.getShortUrl(slide.photos[s], p(this)),
                                !1
                            })
                        }
                    })
                }),
                n.stat.pingpv("copyurl"),
                !1
            }),
            e = p("#js-btn-moreOper"),
            t = e.siblings(".func-more-drop"),
            e.click(function() {
                return e.hasClass("js-show-menu") ? (t.hide(),
                void e.removeClass("js-show-menu").removeClass("icon-wrap-select")) : (e.addClass("js-show-menu").addClass("icon-wrap-select"),
                t.show(),
                !1)
            }),
            i.bind("close", function() {
                a.dispose()
            }))
        },
        movePhoto: function(e) {
            QZONE.FP.getQzoneConfig().loginUin < 1e4 ? QZONE.FP.showLoginBox("photo") : seajs.use("photo.v7/common/dialog/albumSelector/index", function(e) {
                e.get("./init").open({
                    currAlbumId: slide.topic.topicId,
                    title: "移动照片到",
                    loadCss: !1,
                    callback: function(e) {
                        var t, i = e.toAlbumId, o = e.toAlbumName, n = e.currAlbumId, s = e.albumsData;
                        if (i != n) {
                            for (var e in s)
                                if (s[e].id == n) {
                                    t = s[e];
                                    break
                                }
                            var a = slide.index
                              , r = [];
                            r.push(slide.photos[a]),
                            seajs.use("photo.v7/common/photoList/ajax.move", function(e) {
                                e.move({
                                    album: t,
                                    newAlbumId: i,
                                    picArr: r
                                }).done(function(e) {
                                    if (QZONE.FP.showMsgbox("照片成功移动到相册" + escHTML(o), 3, 2e3),
                                    slide.photos.splice(a, 1),
                                    0 == slide.photos.length)
                                        return slide.close(),
                                        !1;
                                    p("#js-thumbList-ctn").html(""),
                                    d.render({
                                        photos: slide.photos,
                                        startIndex: 0
                                    });
                                    var t = p("#js-thumbList-ctn li")
                                      , i = t.length;
                                    i <= a && (a = i - 1),
                                    p(t.get(a)).trigger(u.click)
                                }).fail(function(e) {
                                    QZONE.FP.showMsgbox("移动照片失败，请稍后再试", 3, 2e3)
                                })
                            })
                        } else
                            QZFL.dialog.getCurrentDialog().unload()
                    }
                })
            })
        },
        delPhoto: function() {
            QZONE.FP.getQzoneConfig().loginUin < 1e4 ? QZONE.FP.showLoginBox("photo") : seajs.use(["photo.v7/common/photoList/ajax.del"], function(e) {
                var t = slide.topic
                  , i = slide.index
                  , o = [];
                o.push(slide.photos[i]),
                t.id = t.topicId,
                e.open({
                    album: t,
                    picArr: o,
                    submit: function() {
                        if (QZONE.FP.showMsgbox("删除该照片成功！", 3, 2e3),
                        slide.photos.splice(i, 1),
                        0 == slide.photos.length)
                            return slide.close(),
                            !1;
                        p("#js-thumbList-ctn").html(""),
                        d.render({
                            photos: slide.photos,
                            startIndex: 0
                        });
                        var e = p("#js-thumbList-ctn li")
                          , t = e.length;
                        t <= i && (i = t - 1),
                        p(e.get(i)).trigger(u.click)
                    },
                    cancel: function() {
                        QZONE.FP.showMsgbox("删除照片失败，请稍后再试", 3, 2e3)
                    }
                })
            })
        },
        getShortUrl: function(t, i) {
            QZONE.FP.showMsgbox("正在获取图片地址", 6, 0);
            var e = t.shorturl;
            if (t.shorturl)
                return -1 == e.indexOf("http://qpic.cn/") && (e = "http://qpic.cn/" + e),
                p("#curr-short-link").val(e),
                window.clipboardData ? (i.siblings(".copy-link").show(),
                i.hide()) : (i.hide(),
                i.siblings("span").show()),
                void QZONE.FP.hideMsgbox();
            e = {
                uin: t.ownerUin,
                albumid: t.albumId,
                lloc: t.lloc,
                refer: "qzone",
                t: Math.random()
            };
            h.getShortUrl(e).done(function(e) {
                QZONE.FP.hideMsgbox(),
                e && 0 == e.code && (e = "http://qpic.cn/" + e.data.shorturl,
                p("#curr-short-link").val(e),
                t.shorturl = e,
                window.clipboardData ? (i.siblings(".copy-link").show(),
                i.hide()) : (i.hide(),
                i.siblings("span").show()))
            }).fail(function() {
                QZONE.FP.hideMsgbox(),
                QZONE.FP.showMsgbox("获取短链接失败，请稍后再试", 3, 2e3)
            })
        },
        copy: function(e, t) {
            window.clipboardData ? (window.clipboardData.setData("Text", t),
            QZONE.FP.showMsgbox("复制成功", 3, 2e3)) : QZONE.FP.showMsgbox("您的浏览器不支持该功能，请您使用Ctrl+C复制链接内容", 3, 2e3)
        },
        initYellowLink: function(i) {
            if (0 == QZONE.FP.getUserVIPLevel() || 0 == QZONE.FP.getVipStatus())
                return i.find(".copylink-error").show(),
                i.find(".mod-innerlinks").hide(),
                void i.find(".mod-outlinks").remove();
            var e, t, o;
            i.data("has-init") ? i.find(".mod-outlinks").show() : (e = {
                uin: QZONE.FP.getQzoneConfig().loginUin,
                t: Math.random()
            },
            t = slide.index,
            o = slide.photos[t],
            h.getYellowUrl(e).done(function(e) {
                var t;
                e && 0 == e.code && (e = c.outLinks(o, e.data),
                i.find(".mod-outlinks").html(e).show(),
                o.shorturl ? (t = "http://y.photo.qq.com/img?s=" + o.shorturl + "&l=y.jpg",
                p("#curr-outlink").val(t)) : (t = {
                    uin: o.ownerUin,
                    albumid: o.albumId,
                    lloc: o.lloc,
                    refer: "qzone",
                    t: Math.random()
                },
                h.getShortUrl(t).done(function(e) {
                    QZONE.FP.hideMsgbox(),
                    e && 0 == e.code && (e = "http://y.photo.qq.com/img?s=" + e.data.shorturl + "&l=y.jpg",
                    p("#curr-outlink").val(e))
                }).fail(function() {
                    QZONE.FP.showMsgbox("获取外链链接地址失败，请稍后再试", 3, 2e3)
                })),
                QZFL.dialog.getCurrentDialog().setSize(i.width(), i.height()))
            }).fail(function() {
                QZONE.FP.showMsgbox("获取外链基本信息失败，请稍后再试", 3, 2e3)
            }))
        },
        updateSettingsText: function(e) {
            var t = e.find(".modify-setting").siblings("p");
            t.find("span").remove();
            e = t.text();
            return e += "<span>（还能设置3个）</span>",
            t.html(e),
            !1
        },
        trimWebPurl: function(e) {
            return e && 0 < e.indexOf("?t=5&") ? e = e.replace("?t=5&", "?") : e && 0 < e.indexOf("?t=5") ? e = e.replace("?t=5", "") : e && 0 < e.indexOf("&t=5") && (e = e.replace("&t=5", "")),
            e
        },
        editPhotoWithMeitu: function() {
            QZONE.event.preventDefault();
            var r = this
              , d = QZONE.FP._t
              , e = parseInt(QZONE.cookie.get("uin").replace(/o?(0?)+/, ""), 10);
            d.checkLogin() == d.g_iUin && d.g_iUin == d.g_iLoginUin && d.g_iLoginUin == e && QZONE.cookie.get("skey") ? function() {
                var e = QZFL.media.getFlashVersion().toString();
                if (!(e = (e || "").split(",")) || !parseInt(e[0], 10)) {
                    i = '<iframe id="flashPhotoEditor" frameborder="0" src="/qzone/photo/zone/flashVersionCheck.html#type=install" allowTransparency="true" style="width:214px;height:135px"></iframe>';
                    return QZONE.FP.popupDialog("安装提示", i, 214, 135),
                    QZONE.FP.appendPopupFn(function() {})
                }
                if (e[0] < 10 || 10 == e[0] && e[1] < 1 && ua.firefox) {
                    e = 138;
                    ua.firefox && (e = 135);
                    var i = '<iframe id="flashPhotoEditor" frameborder="0" src="/qzone/photo/zone/flashVersionCheck.html#type=update" allowTransparency="true" style="width:214px;height:' + e + 'px"></iframe>';
                    return QZONE.FP.popupDialog("升级提示", i, 214, e),
                    QZONE.FP.appendPopupFn(function() {
                        10 <= (QZFL.media.getFlashVersion().toString() || "").split(",")[0] && o()
                    })
                }
                function o() {
                    String.prototype.unHtmlReplace = function() {
                        return this.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&quot;/g, '"').replace(/&#(\d{2});/g, function(e, t) {
                            return unescape("%" + parseInt(t).toString(16))
                        })
                    }
                    ;
                    var e, i = (a = r.getCurrPhotoData()).desc.replace(/(?:@\{uin:([\w_]+),nick:([^\}]*?)(?:,who:\d)?\})|[^@]+/g, function(e, i, o) {
                        return i ? (i = trim(i),
                        o = (o = o.unHtmlReplace()).replace(/\%2C|%25|%7D/g, function(e) {
                            switch (e) {
                            case "%2C":
                                return ",";
                            case "%25":
                                return "%";
                            case "%7D":
                                return "}"
                            }
                            return e
                        }),
                        ("@" + (t._remarkData[i] || o)).htmlReplace()) : e
                    }), o = QZONE.FP._t.QZONE.FP.shareDb;
                    o && (e = "editPhotoWithMeitu_" + QZONE.FP.getQzoneConfig().loginUin,
                    s = {
                        aid: slide.topic.topicId,
                        lloc: a.lloc,
                        title: p.trim(a.name),
                        desc: p.trim(i)
                    },
                    o.set(e, QZFL.lang.obj2str(s)));
                    var n, s = r.trimWebPurl(a.origin || a.url);
                    try {
                        n = window.g_qzonetoken || top.g_qzonetoken || ""
                    } catch (e) {}
                    var a = ["owner=" + QZONE.FP.getQzoneConfig().ownerUin, "uin=" + QZONE.FP.getQzoneConfig().loginUin, "g_tk=" + QZONE.FP.getACSRFToken(), "qzonetoken=" + encodeURIComponent(n), "aid=" + encodeURIComponent(p.trim(slide.topic.topicId)), "lloc=" + encodeURIComponent(a.lloc), "url=" + encodeURIComponent(p.trim(s)), "photoinfo=1"].join("&");
                    top.open(window.location.protocol + "//" + d.imgcacheDomain + "/qzone/photo/v7/page/photo.html?init=photo.v7/common/viewer2/meitu/jump&" + a)
                }
                o()
            }() : QZONE.FP.showLoginBox("photo")
        },
        openKadang: function() {
            window.open("http://app.photo.qq.com/cgi-bin/app/cgi_redict_kadang?from=qzone.owner.photoview&g_tk=" + QZONE.FP.getACSRFToken())
        },
        openAichongyin: function() {
            window.open("http://app.photo.qq.com/cgi-bin/app/cgi_redirect_partner?partner=189&g_tk=" + QZONE.FP.getACSRFToken())
        },
        openYinxiangpai: function() {
            window.open("http://app.photo.qq.com/cgi-bin/app/cgi_redirect_partner?partner=163&g_tk=" + QZONE.FP.getACSRFToken())
        },
        openLeyin: function() {
            window.open("http://app.photo.qq.com/cgi-bin/app/cgi_redirect_partner?partner=91ly&g_tk=" + QZONE.FP.getACSRFToken())
        },
        downloadPhoto: function(e) {
            var t, o = this, e = e || {}, i = slide.photos[slide.index], e = e.type || "normal";
            "origin" == e ? (t = o.trimDownloadUrl(i.origin || i.url),
            n.stat.pingpv("downloadHD")) : "raw" == e ? (t = o.trimDownloadUrl(i.raw || i.url),
            n.stat.pingpv("downloadRaw")) : (t = o.trimDownloadUrl(i.downloadUrl || i.url),
            n.stat.pingpv("downloadNormal")),
            function(t) {
                if (window.external && window.external.saveFile)
                    window.external.saveFile(t);
                else if (window.external && window.external.CallHummerApi) {
                    var e = new Date
                      , i = ["QQ图片", e.getFullYear(), ("0" + (e.getMonth() + 1)).slice(-2), ("0" + e.getDate()).slice(-2), ("0" + e.getHours()).slice(-2), ("0" + e.getMinutes()).slice(-2), ("0" + e.getSeconds()).slice(-2), ".jpg"].join("");
                    try {
                        window.external.CallHummerApi("Misc.DownloadFile", '{ "url" : "' + t + '", "fileName" : "' + i + '", "fileSize" : "480000" }')
                    } catch (e) {
                        location.href = o.makeDownloadUrl(t)
                    }
                } else
                    location.href = o.makeDownloadUrl(t)
            }(t && t.replace(/^https?\:/, "https:"))
        },
        trimDownloadUrl: function(e) {
            return e && 0 < e.indexOf("?t=5&") ? e = e.replace("?t=5&", "?") : e && 0 < e.indexOf("?t=5") ? e = e.replace("?t=5", "") : e && 0 < e.indexOf("&t=5") && (e = e.replace("&t=5", "")),
            e
        },
        makeDownloadUrl: function(e) {
            var t = "save=1&d=1";
            return e = e && 0 < e.indexOf("?") ? e + "&" + t : e && e + "?" + t
        },
        getCurrPhotoData: function() {
            var e = p("#js-thumbList-ctn li.on").attr("data-index");
            return slide.photos[e]
        },
        checkShareAble: function() {
            return !0
        },
        sharePhoto: function() {
            var t, i;
            this.checkShareAble() ? (t = slide.photos[slide.index],
            i = null,
            "video" == t.ugcType && t.videoExtend && t.videoExtend.shareH5 && (i = {
                videoh5url: t.videoExtend && t.videoExtend.shareH5
            }),
            require.async("app/v8/controls/forward_box/facade", function(e) {
                e.bootstrap({
                    dialogTitle: "分享到",
                    fwdtype: 0,
                    source: "",
                    isSignIn: !0,
                    hasToWeibo: !0,
                    origInfo: {
                        rtUin: slide.topic.ownerUin,
                        rtTid: slide.topic.topicId + ":" + t.lloc
                    },
                    subinfo: {
                        tid: slide.topic.topicId + ":" + t.lloc,
                        uin: slide.topic.ownerUin,
                        type: "picture",
                        scope: 0
                    },
                    extendData: i,
                    onForwardSuccess: function() {}
                })
            })) : QZONE.FP.showMsgbox("对不起，本相册设置了权限，照片禁止分享。", 3, 2e3)
        },
        delVideo: function() {
            var o = slide.index
              , t = slide.photos[o];
            t && QZONE.FP.confirm("提示", '<p style="font-size:14px;margin:5px;">您确定删除该视频吗？</p><p style="font-size:12px;font-weight:normal;margin:5px;">删除后将无法恢复。若日志等处引用了该视频也将失效！</p>', {
                type: 2,
                icontype: "warn",
                hastitle: !0,
                height: 100,
                tips: ["确定", "取消"],
                okfn: function() {
                    QZONE.FP.getQzoneConfig().loginUin < 1e4 ? QZONE.FP.showLoginBox("photo") : seajs.use(["photo.v7/common/api/videoApi/videoApi"], function(e) {
                        e.deleteVideo({
                            vid: t.picKey
                        }).done(function(e) {
                            if (QZONE.FP.showMsgbox("删除视频成功！", 3, 2e3),
                            slide.photos.splice(o, 1),
                            0 == slide.photos.length)
                                return slide.close(),
                                !1;
                            p("#js-thumbList-ctn").html(""),
                            d.render({
                                photos: slide.photos,
                                startIndex: 0
                            });
                            var t = p("#js-thumbList-ctn li")
                              , i = t.length;
                            i <= o && (o = i - 1),
                            p(t.get(o)).trigger(u.click)
                        }).fail(function(e) {
                            QZONE.FP.showMsgbox(e.message || "删除视频失败，请稍后再试", 3, 2e3)
                        })
                    })
                }
            })
        },
        downloadVideo: function() {
            var e = slide.photos[slide.index];
            if (e && e.videoUrl) {
                n.stat.pingpv("downloadVideo");
                var t = e.video_info ? e.video_info.download_url : e.videoExtend ? e.videoExtend.h264 : e.videoUrl;
                if (window.external && window.external.saveFile)
                    window.external.saveFile(t);
                else if (window.external && window.external.CallHummerApi) {
                    var e = new Date
                      , i = ["QQ视频", e.getFullYear(), ("0" + (e.getMonth() + 1)).slice(-2), ("0" + e.getDate()).slice(-2), ("0" + e.getHours()).slice(-2), ("0" + e.getMinutes()).slice(-2), ("0" + e.getSeconds()).slice(-2), ".mp4"].join("");
                    try {
                        window.external.CallHummerApi("Misc.DownloadFile", '{ "url" : "' + t + '", "fileName" : "' + i + '", "fileSize" : "480000" }')
                    } catch (e) {
                        location.href = this.makeDownloadUrl(t)
                    }
                    return
                }
                -1 < t.indexOf("https://photovideo.photo.qq.com/") ? window.open(this.makeDownloadUrl(t)) : location.href = this.makeDownloadUrl(t)
            }
        },
        dispose: function() {
            this.alive = !1,
            this.btn.hide()
        }
    }),
    e
}),
define.pack("./plugins.music", ["photo.v7/lib/jquery", "./event", "./util", "./tmpl"], function(e, exports, module) {
    var o = e("photo.v7/lib/jquery")
      , a = e("./event")
      , r = (e("./util"),
    e("./tmpl"))
      , e = {};
    return o.extend(e, {
        init: function() {
            this.wrapper = o(".js-userinfo-ctn"),
            this.bind(),
            this.alive = !0
        },
        bind: function() {
            var i;
            this._hasBindEvent || (this._hasBindEvent = !0,
            i = this,
            a.bind("close", function() {
                i.dispose()
            }),
            a.bind("onSetDescHtml", function(e, t) {
                !i.alive || (t = t.photo).desc.voice && (i.setVoiceHtml({
                    photo: t
                }),
                slide._hasVoiceMusic = !0)
            }),
            this.wrapper.delegate(".qz_shuoshuo_audio", "mouseenter", function() {
                o(this).addClass("bor_bg6").removeClass("bor2")
            }).delegate(".qz_shuoshuo_audio", "mouseleave", function() {
                o(this).addClass("bor2").removeClass("bor_bg6")
            }),
            this.wrapper.delegate(".js_play_record", "click", function() {
                var e = o(this)
                  , t = (e.attr("data-id"),
                slide.photos[slide.index].desc.voice[0]);
                e.hasClass("qz_shuoshuo_audio_playing") ? e.attr("title", "播放语音") : e.attr("title", "停止播放"),
                MOOD.media.PlayVoice({
                    id: t.id,
                    time: t.time,
                    url: restXHTML(t.url)
                }, e[0]),
                QZONE.FP.sendPV("taotaoact.qzone.qq.com", "/photo/popup/icenter/voice")
            }))
        },
        setVoiceHtml: function(e) {
            var o = e.photo
              , e = siDomain || "qzonestyle.gtimg.cn"
              , e = ["http://" + e + "/qzone/app/widget/media_player.js", "http://" + e + "/qzone_v6/qz_shuoshuo_audio.css"]
              , n = o.desc.voice
              , s = this;
            seajs.use(e, function(e, t) {
                var i;
                o.picKey !== slide.photos[slide.index].picKey || (i = n && n[0]) && (i.size = s.audio_size(i.time),
                s.wrapper.find("#js-description-inner").html(r.music(i)),
                a.trigger("onDescHtmlChange"))
            })
        },
        audio_size: function(e) {
            return 40 <= e ? "XXL" : 25 < e ? "XL" : 15 < e ? "L" : 5 < e ? "M" : "S"
        },
        dispose: function() {
            this.alive = !1;
            try {
                slide._hasVoiceMusic && (QZONE.FP._t.Qstop(),
                slide._hasVoiceMusic = !1)
            } catch (e) {}
        }
    }),
    e
}),
define.pack("./plugins.quanren", ["photo.v7/lib/jquery", "photo.v7/lib/photo", "./event", "./util", "./tmpl"], function(e, exports, module) {
    var s = e("photo.v7/lib/jquery")
      , a = e("photo.v7/lib/photo")
      , r = e("./event")
      , d = e("./util")
      , t = (e("./tmpl"),
    d.evt)
      , e = {};
    return s.extend(e, {
        init: function() {
            this.wrapper = s("#js-image-ctn"),
            this.faceArea = s("#js-face-area"),
            this.alive = !0,
            this.btn = s("#js-btn-open-quanren"),
            this.bind()
        },
        bind: function() {
            var i;
            this._hasBindEvent || 4 != slide.config.appid && 311 != slide.config.appid || "hd" != slide.getMode() && (this._hasBindEvent = !0,
            (i = this).wrapper.on(t.click, "#tagArea a", function(e) {
                e.stopPropagation()
            }),
            r.bind("go", function(e, t) {
                r.quanren = !1,
                s("#selectorContainer .js_friendselector_container").hide(),
                s("#markContainer").hide(),
                i.btn.hide()
            }),
            r.bind("hideQuanrenInfo", function() {
                return s("#markContainer").hide(),
                !1
            }),
            r.bind("showQuanrenInfo", function() {
                return slide && slide.isOpen() && s("#markContainer").show(),
                !1
            }),
            r.bind("imgShowDone imgShowOrigin imgShowNormal imgDragDone afterWindowResize onSetDescHtml imgScrollDone faceOpDone", function(e) {
                var t;
                i.alive && (4 != slide.config.appid && 311 != slide.config.appid || (!slide.isOpen() || d.isFullScreenStatus() || "hd" == slide.getMode() ? s("#markContainer").hide() : (t = slide.photos[slide.index]) && "video" == t.ugcType || (i.isMarkable(t) ? setTimeout(function() {
                    i.btn.show()
                }, 500) : i.btn.hide(),
                0 == s("#js-btn-quanren-list").children("#tagging_list").length && (s("#tagging_list").length ? s("#js-btn-quanren-list").append(s("#tagging_list")) : s("#js-btn-quanren-list").append('<span id="tagging_list" style="display:none;"></span>')).show(),
                clearTimeout(slide._quanrenTimer),
                slide._quanrenTimer = setTimeout(function() {
                    i.bindMark()
                }, 500))))
            }),
            r.bind("close", function() {
                i.dispose()
            }))
        },
        dispose: function() {
            this.alive = !1,
            this.btn && this.btn.hide && this.btn.hide(),
            r.quanren && seajs.use(["photo.v7/module/quanren/index.js"], function(e) {
                e.get("./init").demark()
            }),
            r.quanren = !1,
            s("#js-btn-open-quanren").hide(),
            s("#markContainer").hide()
        },
        setQuanFromFlag: function(e) {
            e && (e.quanfrom = 311 == slide.config.appid ? "moodfloat" : "photofloat")
        },
        getAlbumInfo: function() {
            var e;
            return 4 == slide.config.appid ? slide.topic : {
                id: (e = slide.photos[slide.index]) && e.albumId || "",
                bitmap: "00000000"
            }
        },
        isMarkable: function(e) {
            var t, i, o = slide.config.appid, n = !1;
            return "videoandrec" != slide.config.type && (4 == o ? e && e.ownerUin == a.user.getLoginUin() ? n = !0 : slide.topic && (t = slide.topic.priv,
            i = slide.topic.bitmap,
            n = (1 == t || 4 == t || 6 == t || 8 == t) && !(i && "1" == i.charAt(i.length - 2))) : 311 == o && (n = (e = slide.photos[slide.index]) && 1 == e.who && 1 == e.picmarkEnable),
            n)
        },
        compatiPhoto: function(e) {
            e && (e.photoOwner = e.photoOwner || e.ownerUin,
            this.setQuanFromFlag(e),
            311 == slide.config.appid && (e.extdata = [e.ownerUin, e.ugcKey, e.ugcRight, e.topicId, e.t1_source].join("|")))
        },
        bindMark: function() {
            var n = this;
            seajs.use(["photo.v7/module/quanren/index.js", "photo.v7/common/friendSelector/index"], function(e) {
                var t, i, o = slide && slide.photos && slide.photos[slide.index];
                slide && slide.isOpen() ? o && (d.isFullScreenStatus() || (t = s("#js-img-border")).length && (s("#markContainer").show(),
                (i = s("#tagging_list")).length && i.children().length && (o.browser = 1),
                e = e.get("./init"),
                slide._hasInitQuanren || n.initQuanren(e),
                311 != slide.config.appid || 1 != o.who || o.picmarkEnable || d.stat.pingpv("circle.shuoshuoCantmark"),
                n.compatiPhoto(o),
                e.bind(n.getAlbumInfo(), o, t, function() {
                    r.trigger("slideModeChange"),
                    setTimeout(function() {
                        t.trigger("mouseover")
                    }, 0)
                }))) : s("#markContainer").hide()
            })
        },
        isRetweetShuoshuo: function(e) {
            return 311 == slide.config.appid && e && !!e.original_tid
        },
        initQuanren: function(t) {
            var i = this;
            t.init({
                inViewer: !0,
                imgContainer: "js-img-border",
                tagContainer: "js-btn-open-quanren",
                imgContainerParent: "body",
                container: "js-viewer-container",
                isFriend: function() {
                    var e = slide && slide.photos && slide.photos[slide.index];
                    return 4 == slide.config.appid ? !(!e || e.ownerUin != a.user.getLoginUin()) || !!slide.isFriend : (e && e.ownerUin == a.user.getLoginUin() || !!slide.isFriend) && !i.isRetweetShuoshuo(e)
                },
                onBeforeMark: function() {
                    if (s("#js-img-disp").hasClass("rotate"))
                        return QZONE.FP.showMsgbox("旋转照片时无法圈人", 3, 1e3),
                        !1;
                    var e = slide && slide.photos && slide.photos[slide.index];
                    return i.isMarkable(e) ? (r.quanren = !0,
                    s("body").one("keydown.exitQuan", function(e) {
                        27 == e.keyCode && "normal" != t.getCurrMode() && (r.quanren = !1)
                    }),
                    !0) : (QZONE.FP.showMsgbox("主人不允许对该相册进行圈人哦~", 2, 2e3),
                    !1)
                },
                onEndMark: function(e) {
                    r.quanren = !1,
                    s(document).off("keydown.exitQuan"),
                    r.trigger("slideModeChange")
                },
                onMark: function(e) {
                    var t = slide.photos[slide.index]
                      , i = 0;
                    if (t) {
                        t.browser || (t.browser = 1),
                        t.faceList || (t.faceList = []);
                        for (var o = 0, n = t.faceList.length; o < n; o++)
                            if (t.faceList[o].faceid == e.faceid) {
                                t.faceList[o] = e,
                                i = 1;
                                break
                            }
                        i || t.faceList.push(e)
                    }
                    r.trigger("slideModeChange"),
                    r.trigger("updateFaceInfo")
                },
                onDelMark: function(e) {
                    for (var t = slide.photos[slide.index], i = 0; i < t.faceList.length; i++)
                        if (t.faceList[i].faceid == e.faceid) {
                            t.faceList[i].quanstate = 0,
                            t.faceList[i].targetuin = 0,
                            t.faceList[i].targetnick = "";
                            break
                        }
                    r.trigger("slideModeChange")
                },
                hotClick: function(e) {
                    d.stat.pingpv("circle." + e)
                }
            }),
            slide._hasInitQuanren = !0
        }
    }),
    e
}),
define.pack("./plugins.recom", ["photo.v7/lib/jquery", "photo.v7/lib/photo", "./event", "./util", "./tmpl", "./api.photos", "photo.v7/common/api/qboss/ajax.get.js"], function(require, exports, module) {
    var a = require("photo.v7/lib/jquery")
      , r = require("photo.v7/lib/photo")
      , s = require("./event")
      , e = require("./util")
      , i = require("./tmpl")
      , n = require("./api.photos")
      , d = require("photo.v7/common/api/qboss/ajax.get.js")
      , t = e.evt
      , o = {
        albumCache: {}
    };
    return a.extend(o, {
        init: function() {
            this._hasPopup = !1,
            this.wrapper = slide.wrapper,
            this.bind()
        },
        bind: function() {
            var i;
            this._hasBindEvent || (this._hasBindEvent = !0,
            i = this,
            s.bind("close", function() {
                i.dispose()
            }),
            s.bind("beforeGo", function(e, t) {
                return i.checkNeedPopup(t) ? (s.stopGo = !0,
                i.popup(),
                void i.getAlbumList()) : i.checkIsLast(t) ? (s.stopGo = !0,
                void ("video" == slide.option.type || "videoandrec" == slide.option.type ? QZONE.FP.showMsgbox("此视频已经是最后一个哦", 3, 2e3) : QZONE.FP.showMsgbox("此照片已经是第一张哦", 3, 2e3))) : void (i.isShow() ? s.stopGo = !0 : s.stopGo = !1)
            }),
            this.wrapper.delegate("#js-recom-layer", t.click, this.close),
            this.wrapper.delegate("#js-recom-closeBtn", t.click, this.close),
            this.wrapper.delegate(".photoimg", t.click, function() {
                e.stat.pingpv("recom-photoimg")
            }),
            this.wrapper.delegate(".morelink", t.click, function() {
                e.stat.pingpv("recom-morelink")
            }),
            this.wrapper.delegate("#js-btn-review", t.click, function() {
                e.stat.pingpv("recom-review")
            }),
            this.wrapper.delegate("#js-btn-recomCmt", t.click, function() {
                return e.stat.pingpv("recom-recomCmt"),
                "undefined" != typeof QPHOTO ? i.showCmtBox() : seajs.use("http://" + (siDomain || "qzonestyle.gtimg.cn") + "/qzone/photo/logic/photoLogic.js", function() {
                    i.showCmtBox()
                }),
                !1
            }))
        },
        checkNeedPopup: function(e) {
            if (4 != slide.config.appid)
                return !1;
            if ("iphoto" == slide.config.type)
                return !1;
            var t = e.prev
              , i = slide.photos.length
              , o = e.curr
              , n = slide.last
              , e = e.direction;
            return !(t != i - 1 || 0 != o || !n || this._hasPopup || "right" != e) && (s.trigger("hideQuanrenInfo"),
            !0)
        },
        checkIsLast: function(e) {
            var t = e.prev
              , i = slide.photos.length
              , o = e.curr
              , n = slide.last
              , e = e.direction;
            return !(t != i - 1 || 0 != o || !n || "right" != e)
        },
        popup: function() {
            this._hasPopup = !0,
            slide.wrapper.append(i.recom({}))
        },
        getAlbumList: function() {
            var t = slide.photos[0].ownerUin
              , e = this.albumCache[t]
              , i = this;
            e ? this.showAlbumList(e) : n.getAlbumList({
                hostUin: t,
                uin: QZONE.FP.getQzoneConfig().loginUin
            }).done(function(e) {
                i.albumCache[t] = e,
                i.showAlbumList(e),
                s.trigger("hideQuanrenInfo")
            })
        },
        showAlbumList: function(e) {
            var t = slide.photos[0];
            e.ownerName = t.ownerName,
            e.ownerUin = t.ownerUin,
            e.album && e.album.length && (a("#js-recom-otherCtn").html(i.albumList(e)).show(),
            this.loadImg(),
            this.loadAd())
        },
        loadImg: function() {
            var o = this;
            this.wrapper.find(".js-recom-albumPhoto").each(function() {
                var t = a(this)
                  , i = t.attr("data-src");
                e.imgLoad(i, function(e) {
                    t.attr({
                        src: i
                    }),
                    o.scaleImg({
                        img: t,
                        w: e.width,
                        h: e.height
                    })
                })
            })
        },
        loadAd: function() {
            require.async(["photo.v7/common/api/qboss/ajax.get"], function(e) {
                var s = "2341";
                e && e.get({
                    board_id: s,
                    uin: r.user.getOwnerUin()
                }).done(function(e) {
                    var t, i, o, n;
                    e.data && 0 < e.data.count && e.data[s] && (t = e.data[s].items) && 0 < t.length && t[0] && t[0].extdata && (i = new Function("return " + r.string.htmlDecode(t[0].extdata))(),
                    o = a("#js-ad-area"),
                    n = a("#js-ad-link"),
                    e = a("#js-ad-img"),
                    i.img && i.link && (n.on("click", function() {
                        d.report({
                            from: 0,
                            qboper: 2,
                            bosstrace: t[0].bosstrace
                        }),
                        window.open(i.link, "_blank")
                    }),
                    e.attr("src", i.img),
                    o.show()))
                })
            })
        },
        scaleImg: function(e) {
            var t = Math.max(115 / e.w, 95 / e.h);
            e.img.css({
                width: Math.floor(e.w * t),
                marginLeft: Math.floor((115 - e.w * t) / 2),
                marginTop: Math.max(Math.floor((95 - e.h) / 2), 0)
            })
        },
        close: function() {
            a("#js-recom-wrapper").remove(),
            s.stopGo = !1,
            s.trigger("showQuanrenInfo"),
            e.stat.pingpv("recom-close")
        },
        review: function() {
            this.close(),
            slide.index = 0,
            s.trigger("go", {
                prev: slide.photos.length - 1,
                curr: 0,
                photo: slide.photos[0]
            })
        },
        showCmtBox: function() {
            QPHOTO = QPHOTO || {},
            QPHOTO.dialog || (QPHOTO.dialog = {});
            var e = slide.photos[0]
              , i = e.ownerUin
              , o = e.albumId;
            seajs.use("http://" + (siDomain || "qzonestyle.gtimg.cn") + "/qzone/photo/zone/script/commentDialog", function() {
                var e = Math.floor((QZFL.dom.getClientHeight(QZONE.FP._t.document) - 170) / 2) - QZFL.dom.getXY(slide.wrapper[0]) + QZONE.FP.getScrollTop();
                QPHOTO.dialog.comment.show({
                    top: e,
                    title: "评论相册",
                    onComment: function(e, t) {
                        e = escHTML(e),
                        n.commentAlbum({
                            hostUin: i,
                            topicId: o,
                            content: e
                        }).done(function(e) {
                            QZFL.FP.showMsgbox("相册评论成功！", 4, 2e3)
                        }).fail(function(e) {
                            QZFL.FP.showMsgbox("系统繁忙，请稍后重试", 1, 2e3)
                        })
                    }
                })
            })
        },
        isShow: function() {
            return a("#js-recom-wrapper").is(":visible")
        },
        dispose: function() {
            this.close(),
            this._hasPopup = !1,
            s.stopGo = !1
        }
    }),
    o
}),
define.pack("./plugins.reprint", ["photo.v7/lib/jquery", "./event", "./util"], function(e, exports, module) {
    var o = e("photo.v7/lib/jquery")
      , t = e("./event")
      , n = e("./util")
      , e = {};
    return o.extend(e, {
        init: function() {
            this.wrapper = o("#js-sidebar-ctn"),
            this.alive = !0,
            this.bind(),
            this.btn = o("#js-viewer-reprint")
        },
        bind: function() {
            var e;
            this._hasBindEvent || (this._hasBindEvent = !0,
            e = this,
            t.bind("showSideBarButtons", function() {
                e.checkReprintable() && e.alive && e.btn.parent().show()
            }),
            t.bind("close", function() {
                e.dispose()
            }),
            this.wrapper.delegate("#js-viewer-reprint", "click", function() {
                return e.showBox(),
                n.stat.pingpv("zhuanzai"),
                !1
            }))
        },
        checkReprintable: function() {
            var e = slide.topic && slide.topic.ownerUin;
            if (e && e == QZONE.FP.getQzoneConfig().loginUin)
                return o("#js-viewer-desc-edit").show(),
                !1;
            e = slide.topic && slide.topic.bitmap;
            return !e || !("0" != e.charAt(e.length - 1) || !this.alive)
        },
        showBox: function() {
            slide.photos[slide.index];
            var i = this;
            seajs.use(["photo.v7/common/dialog/albumSelector/index"], function(e) {
                e.get("./init").open({
                    currAlbumId: "",
                    title: "转载到我的相册",
                    loadCss: !1,
                    callback: function(e) {
                        e = e || {},
                        e.toAlbumName,
                        e.currAlbumId,
                        e.albumsData;
                        var t = e.toAlbum;
                        e && t && i.showBoxNext(t)
                    }
                })
            })
        },
        showBoxNext: function(t) {
            var i = slide.photos[slide.index];
            QZONE.FP._t.$getReprientData = QZONE.FP._t.getReprientData = function() {
                var e = {
                    toAlbum: t,
                    spaceuin: i.ownerUin,
                    srcalbumid: i.albumId,
                    zzuin: QZONE.FP.getQzoneConfig().loginUin,
                    from: "photo",
                    title: i.name,
                    desc: i.desc,
                    from: slide.config.info.reprintFrom,
                    uin: QZONE.FP.getQzoneConfig("loginUin"),
                    url: i.url,
                    owner: i.ownerUin || "",
                    ownerName: i.ownerName || i.ownername || ""
                };
                return o.extend(e, i),
                e.ownername = encodeURIComponent(trim(e.ownerName)),
                e
            }
            ,
            QZONE.FP.getLoginUserBitMap(function(e, t) {
                var i;
                0 != t || window.inqq || n.getParameter("inqq") ? (i = {
                    src: slide.config.info.reprintUrl
                },
                QZONE.FP._t.QZFL.dialog.create("转载到我的相册", i, {
                    width: 1,
                    height: 1,
                    onLoad: function(e) {
                        e && e.dialogBody && o(e.dialogBody).css({
                            zIndex: -1,
                            width: 0,
                            height: 0
                        })
                    }
                })) : ((i = new QZONE.widget.Confirm("提示","您尚未开通空间，无法转载该相册。<br/>是否开通空间？",QZONE.widget.Confirm.TYPE.OK_CANCEL)).tips[0] = "确定",
                i.tips[2] = "取消",
                i.onConfirm = function() {
                    window.open("http://dynamic.qzone.qq.com/cgi-bin/portal/cgi_select_activity")
                }
                ,
                i.show())
            }, 1)
        },
        dispose: function() {
            this.alive = !1,
            this.btn.parent().hide(),
            o("#js-viewer-desc-edit").hide()
        }
    }),
    e
}),
define.pack("./plugins.retweet", ["photo.v7/lib/jquery", "photo.v7/lib/photo", "./event", "./util", "./tmpl"], function(e, exports, module) {
    var f = e("photo.v7/lib/jquery")
      , v = e("photo.v7/lib/photo")
      , t = e("./event")
      , _ = e("./util")
      , s = e("./tmpl")
      , e = {};
    function w(e) {
        var t;
        return ("videoandrec" == slide.option.type ? e.fwdData && e.fwdData.num : (t = e.desc && e.desc.ritem,
        e.fwdnum || t && t.rt_sum)) || 0
    }
    return f.extend(e, {
        init: function() {
            this.wrapper = f("#js-sidebar-ctn"),
            this.bind(),
            this.alive = !0,
            this.btn = f("#js-viewer-retweet"),
            this.clickInterBtn = 311 == slide.config.appid || 4 == slide.config.appid && "videoandrec" == slide.option.type || 202 == slide.config.appid && ("videoandrec" == slide.option.type || "album" == slide.option.type || "photo" == slide.option.type),
            this.clickInterBtn ? f("#js-interactive-btn").attr("title", "转发") : f("#js-interactive-btn").attr("title", "互动"),
            t.trigger("changeInterBtn", {
                clickInterBtn: this.clickInterBtn
            })
        },
        bind: function() {
            var i;
            this._hasBindEvent || (this._hasBindEvent = !0,
            i = this,
            t.bind("close", function() {
                i.dispose()
            }),
            t.bind("showSideBarButtons", function() {
                i.alive && i.checkRetweetable() ? i.btn.parent().show() : i.btn.parent().hide()
            }),
            t.bind("go", function(e, t) {
                f("#js-mod-retweet").html("").hide();
                try {
                    slide.comment.show(),
                    i.rtBox && i.rtBox.dispose()
                } catch (e) {}
                i.refreshFwdNum(w(t.photo))
            }),
            this.wrapper.delegate("#js-interactive-btn", "click", function(e) {
                if (i.clickInterBtn) {
                    if (e.preventDefault(),
                    _.stat.pingpv("zhuanfa"),
                    f("#js-cmt-poster-wrapper").hide(),
                    i.rtBox && f("#js-mod-retweet").is(":visible"))
                        return f("#js-mod-retweet").hide(),
                        i.rtBox.focus(),
                        void f("#js-mod-retweet").show();
                    i.rtBox && i.rtBox.dispose(),
                    i.showBox(),
                    f("#j-comment-tab").find("a").removeClass("tab-selected").first().addClass("tab-selected").click(),
                    f("#j-comment-tab").css("display", "none")
                }
            }))
        },
        checkRetweetable: function() {
            var e = slide.photos[slide.index];
            return !(e && e.desc && e.desc.voice)
        },
        hide: function() {
            f("#js-mod-retweet").html("").hide(),
            f("#js-comment-ctn").removeClass("js_show_retweet").addClass("js_show_comment")
        },
        refreshFwdNum: function(e) {
            this.clickInterBtn ? (f("#js-interactive-btn .btn-txt").text("转发"),
            f("#js-interactive-btn .btn-txt-num").text(0 < e ? "(" + _.formatNum(e) + ")" : "")) : (f("#js-interactive-btn .btn-txt").text(""),
            f("#js-interactive-btn .btn-txt-num").text(""))
        },
        showBox: function() {
            var m = slide.photos[slide.index]
              , g = this;
            if (g.rtBox) {
                try {
                    g.rtBox.dispose()
                } catch (e) {}
                try {
                    f("#js-mod-retweet").html("")
                } catch (e) {}
                g.rtBox = null,
                slide.rtBox = null
            }
            requirejSolution(function(e) {
                e.load({
                    multiRes: [{
                        resName: "RetweetBox",
                        nsName: "/controls",
                        nsVer: "3.0"
                    }, {
                        resName: "RetweetBoxViewModel",
                        nsName: "/controls/retweetBox",
                        nsVer: "3.0"
                    }],
                    onSuccess: function(e, t) {
                        var i, o, n, s, a, r, d, l, p, c, h, u = (i = m,
                        c = slide.config.retweet,
                        p = c && c.getRetweetData ? c.getRetweetData(i) : (o = i.ownerUin,
                        n = i.appid,
                        s = i.tid,
                        a = i.desc && i.desc.content,
                        r = (p = i.desc && i.desc.ritem) && p.rt_uin,
                        d = p && p.rt_tid,
                        l = p && p.rt_source,
                        c = p && p.content,
                        p = i.fwdnum || p && p.rt_sum || 0,
                        {
                            appid: n || slide.option.appid,
                            uin: o,
                            tid: s,
                            t1s: 1,
                            content: a,
                            rtuin: r,
                            rtid: d,
                            rts: l,
                            rtcontent: c,
                            rtsum: p
                        }),
                        f.extend({
                            t1s: 1
                        }, p));
                        u.uin && u.appid && u.tid && (t = {
                            paginatorVisible: !0,
                            showAllLinkVisible: !0,
                            showAllLinkNewWindow: !0,
                            showRetweetList: !0,
                            initRetweetList: [],
                            dataContext: new t({
                                toRetweet: {
                                    id: u.tid,
                                    tid: u.tid,
                                    source: u.t1s || 1,
                                    isSignIn: !0,
                                    retweetListInfo: {
                                        pageSize: 10,
                                        alwaysShowList: !0,
                                        pfType: u.t1s || 1,
                                        rtPfType: u.rts || 1,
                                        rtTid: u.rtid || "",
                                        rtUin: u.rtuin || "",
                                        tid: u.tid || "",
                                        uin: u.uin || "",
                                        totalForShow: u.rtsum || 0
                                    },
                                    poster: {
                                        uin: u.uin
                                    },
                                    content: u.content,
                                    rt_content: u.rtcontent || ""
                                }
                            }),
                            close: function() {},
                            onPosted: function() {
                                var e, t, i = w(m);
                                e = m,
                                t = ++i,
                                "videoandrec" == slide.option.type ? (e.fwdData = e.fwdData || {},
                                e.fwdData.num = t) : (e.fwdnum = t,
                                (e = e.desc && e.desc.ritem) && (e.rt_sum = t)),
                                g.refreshFwdNum(i),
                                g.hide(),
                                slide.comment.show(),
                                f("#js-viewer-comment").click(),
                                _.stat.pingpv("retweetSucc")
                            },
                            extensions: {
                                emoticon: {
                                    show: !0,
                                    text: ""
                                },
                                mention: {
                                    show: !0,
                                    text: ""
                                },
                                syncComment: {
                                    show: !0,
                                    text: "评论"
                                },
                                syncWeibo: {
                                    show: !0,
                                    text: "微博"
                                }
                            }
                        },
                        311 != u.appid && (t.post = function() {
                            var t, e;
                            u.type && (e = (t = this).getContentBox().getContent(!0),
                            v.ajax.request({
                                type: "post",
                                requestType: "formSender",
                                charsetType: "UTF8",
                                url: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_save",
                                data: f.extend({
                                    type: u.type,
                                    fupdate: 1,
                                    platform: "qzone",
                                    description: e,
                                    spaceuin: u.uin,
                                    id: u.tid,
                                    entryuin: QZONE.FP.getQzoneConfig("loginUin"),
                                    comment: t.$("commentCheckBox").checked ? 1 : 0,
                                    share2weibo: t.$("toWeiboCheckBox").checked ? 1 : 0
                                }, u.extendData),
                                success: function(e) {
                                    0 == e.code ? (QZONE.FP.showMsgbox("转发成功", 4, 2e3),
                                    t.reset(),
                                    t.close(),
                                    t.onPosted()) : QZONE.FP.showMsgbox(e.message, 5, 2e3)
                                },
                                error: function(e) {
                                    QZONE.FP.showMsgbox(e.message, 5, 2e3)
                                },
                                noCodeDeal: !0
                            }))
                        }
                        ),
                        h = new e(t),
                        f("#js-mod-retweet").html("").show(),
                        h.renderIn(f("#js-mod-retweet")[0]),
                        g.initScrollBar(),
                        slide.comment.hide(),
                        g.rtBox = h,
                        slide.rtBox = h,
                        setTimeout(function() {
                            try {
                                h.focus()
                            } catch (e) {}
                        }, 0))
                    }
                })
            })
        },
        initScrollBar: function() {
            slide._interval && clearInterval(slide._interval),
            slide._interval = setInterval(function() {
                var t = f("#js-mod-retweet .retweet_list")
                  , e = t.children();
                e.hasClass("retweetWrapper") || (e = e.remove(),
                t.append('<div class="retweetWrapper"></div>'),
                t.children().append(e));
                var i = f("#js-sidebar-ctn")
                  , o = i.height()
                  , n = i.children().children().height()
                  , i = o - f(".js-userinfo-ctn").height() - f(".handle_tab").height() - f("#js-like-list").height() - 140;
                o < n && (t.hasClass("js-scrollbox") && e.hasClass("js-scrollcont") ? f("#js-viewer-ret-scrollcont").trigger("updateScroll") : (t.addClass("js-scrollbox").addClass("js-slideview-scrollbox").attr("ori-height", i).height(i),
                t.children().addClass("js-scrollcont").attr("id", "js-viewer-ret-scrollcont"),
                0 == t.find(".js-scrollbar").length && t.prepend(s.scrollBar()),
                seajs.use("photo.v7/common/scrollBox/index", function(e) {
                    e.get("./scroll")({
                        boxDiv: t[0]
                    })
                })))
            }, 2e3)
        },
        dispose: function() {
            this.btn.parent().hide(),
            this.hide(),
            this.alive = !1;
            try {
                slide.comment.show(),
                clearInterval(slide._interval),
                this.rtBox.dispose()
            } catch (e) {
                clearInterval(slide._interval)
            }
        }
    }),
    e
}),
define.pack("./plugins.rightmenu", ["photo.v7/lib/jquery", "./event", "./util", "photo.v7/lib/photo", "./tmpl"], function(e, exports, module) {
    var l = e("photo.v7/lib/jquery")
      , t = e("./event")
      , p = e("./util")
      , c = (e("photo.v7/lib/photo"),
    e("./tmpl"))
      , e = {};
    return l.extend(e, {
        init: function() {
            this.wrapper = l("#js-viewer-imgWraper"),
            this.alive = !0,
            this.btn = this.wrapper.find(".js-rightmenu-box"),
            this.bind()
        },
        bind: function() {
            var d;
            this._hasBindEvent || (this._hasBindEvent = !0,
            (d = this).wrapper.on("contextmenu", function(e) {
                0 == d.btn.length && (d.wrapper.append(c.rightmenu()),
                d.btn = d.wrapper.find(".js-rightmenu-box"),
                d.btn.hide());
                var t = e.clientX
                  , i = d.wrapper.offset().left
                  , o = d.wrapper.width()
                  , n = d.btn.width()
                  , s = t - i - 15
                  , a = l("#js-btn-downloadThisImg").parent();
                i + o < t + n && (s = s - n + 30),
                d.btn.find("ul").prepend(a);
                var r = e.clientY
                  , i = d.wrapper.position().top
                  , o = d.wrapper.height()
                  , t = d.btn.height()
                  , n = r - i - l("#js-viewer-main").position().top - 15;
                i + o < r + t && (n = n - t + 30,
                d.btn.find("ul").append(a));
                e = l(e.target),
                e.parent();
                if (e.is("img")) {
                    if (window.inqq || p.getParameter("inqq"))
                        return d.btn.css({
                            top: n,
                            left: s
                        }).show(),
                        !1;
                    n = e.attr("data-src") || e.attr("src"),
                    s = n.replace("&t=5", "");
                    s !== n && (e.attr("src", s),
                    p.stat.pingpv("rightClick-webp-jpg"))
                }
                p.stat.pingpv("rightClick")
            }),
            d.wrapper.on("mouseleave", ".js-rightmenu-box", function() {
                clearTimeout(slide._timer),
                slide._timer = setTimeout(function() {
                    0 == d.btn.find(":hover").length && d.btn.hide()
                }, 1e3)
            }),
            d.wrapper.on("click", "#js-btn-openNewImg", function(e) {
                var t = slide.photos[slide.index]
                  , i = slide.getMode();
                return "hd" == i || "full" == i ? window.open(t.origin || t.url) : window.open(t.url),
                d.btn.hide(),
                p.stat.pingpv("rightClickOpenImg"),
                !1
            }),
            d.wrapper.on("click", "#js-btn-downloadThisImg", function(e) {
                var t = slide.photos[slide.index]
                  , i = slide.getMode()
                  , o = (p.getParameter("inqq"),
                window.external);
                return "hd" == i || "full" == i ? (o && o.saveFile ? o.saveFile(d.trimDownloadUrl(t.origin || t.url)) : location.href = d.trimDownloadUrl(t.origin || t.url) + "&d=1",
                t.origin && p.stat.pingpv("downloadOrigin")) : (o && o.saveFile ? o.saveFile(d.trimDownloadUrl(t.downloadUrl || t.url)) : location.href = d.trimDownloadUrl(t.downloadUrl || t.url) + "&d=1",
                p.stat.pingpv("downloadNormal")),
                d.btn.hide(),
                p.stat.pingpv("rightClickDownloadImg"),
                !1
            }),
            d.wrapper.on("click", "#js-btn-copyThisUrlAddress", function(e) {
                var t = slide.photos[slide.index]
                  , i = slide.getMode()
                  , o = "hd" == i || "full" == i ? d.trimDownloadUrl(t.origin || t.url) : d.trimDownloadUrl(t.downloadUrl || t.url);
                return seajs.use("photo.v7/common/dialog/dialog", function(e) {
                    e.open({
                        title: "复制当前图片地址",
                        content: c.rightmenuCopyAdderss(o),
                        width: 540,
                        height: 100,
                        onLoad: function() {
                            setTimeout(function() {
                                l("#js-thisimg-url").focus().select(),
                                l("#js-thisimg-copybtn").off("click").click(function() {
                                    var e = l(this).prev().val();
                                    return d.copy(e),
                                    !1
                                })
                            }, 0)
                        }
                    })
                }),
                d.btn.hide(),
                p.stat.pingpv("rightClickCopyAddress"),
                !1
            }),
            t.bind("go slideModeChange", function() {
                d.btn.hide()
            }),
            l("body").click(function() {
                d.btn.hide()
            }),
            t.bind("close", function() {
                d.dispose()
            }))
        },
        trimDownloadUrl: function(e) {
            return e && 0 < e.indexOf("?t=5&") ? e = e.replace("?t=5&", "?") : e && 0 < e.indexOf("?t=5") ? e = e.replace("?t=5", "") : e && 0 < e.indexOf("&t=5") && (e = e.replace("&t=5", "")),
            e
        },
        copy: function(e) {
            window.clipboardData ? (window.clipboardData.setData("Text", e),
            QZONE.FP.showMsgbox("复制成功", 3, 2e3)) : QZONE.FP.showMsgbox("您的浏览器不支持该功能，请您使用Ctrl+C复制链接内容", 3, 2e3)
        },
        dispose: function() {
            this.alive = !1,
            this.btn.hide()
        }
    }),
    e
}),
define.pack("./plugins.share", ["photo.v7/lib/jquery", "./event", "./util"], function(e, exports, module) {
    var t = e("photo.v7/lib/jquery")
      , i = e("./event")
      , e = (e("./util"),
    {});
    return t.extend(e, {
        init: function() {
            this.wrapper = t("#js-sidebar-ctn"),
            this.alive = !0,
            this.bind(),
            this.btn = t("#js-viewer-share")
        },
        bind: function() {
            var e;
            this._hasBindEvent || (this._hasBindEvent = !0,
            e = this,
            i.bind("firstCommentModuleReady", function() {
                e.alive && e.btn.show()
            }),
            i.bind("close", function() {
                e.dispose()
            }),
            this.wrapper.delegate("#js-viewer-share", "click", function() {
                e.showBox()
            }))
        },
        showBox: function() {
            var e = slide.photos[slide.index];
            QZONE.FP.popupDialog("添加到我的分享", {
                src: "http://" + QZONE.FP._t.imgcacheDomain + "/qzone/app/qzshare/popup.html#uin=" + e.ownerUin + "&itemid=" + e.shareId
            }, 435, 152)
        },
        dispose: function() {
            this.alive = !1,
            this.btn.hide()
        }
    }),
    e
}),
define.pack("./plugins.tuya", ["photo.v7/lib/jquery", "./event", "./util"], function(e, exports, module) {
    var o = e("photo.v7/lib/jquery")
      , i = e("./event")
      , n = e("./util")
      , e = {};
    return o.extend(e, {
        init: function() {
            this.wrapper = o("#js-sidebar-ctn"),
            this.alive = !0,
            this.btn = this.wrapper.find("#js-btn-tuya-li").show(),
            this.bind()
        },
        bind: function() {
            var t;
            this._hasBindEvent || (this._hasBindEvent = !0,
            (t = this).wrapper.delegate("#js-btn-tuya", "click", function(e) {
                return e.preventDefault(),
                t.openTuya(),
                n.stat.pingpv("tuya"),
                !1
            }),
            i.bind("close", function() {
                t.dispose()
            }))
        },
        openTuya: function() {
            o("#js-thumbList-ctn li.on").attr("data-index");
            var e = slide.photos[slide.index]
              , t = e.ownerUin != QZONE.FP.getQzoneConfig().loginUin;
            if (!t)
                return !1;
            function i(i, e) {
                QZFL.object.extend(i, {
                    title: "照片涂鸦",
                    mode: "editor",
                    returnCode: "110206",
                    allowShare: !1,
                    replaceOption: !e,
                    uploadAlbum: e ? "tietu" : "same",
                    type: "link",
                    submitName: "发说说",
                    shuoshuo: 1,
                    needUpload: "true",
                    speedPoints: {},
                    onSave: function(e) {
                        var t = {
                            richtype: 1,
                            richval: [QZFL.FP.getQzoneConfig("loginUin"), e.albumid || i.albumId, e.lloc, e.sloc, e.type, e.height, e.width, e.origin_uuid, e.origin_height || 0, e.origin_width || 0].join(","),
                            special_url: "",
                            subrichtype: 1,
                            who: 1,
                            con: e.shuoshuo || "来自QQ空间涂鸦  http://url.cn/EeKXxd",
                            feedversion: 1,
                            ver: 1,
                            private: 0,
                            out_charset: "UTF-8"
                        };
                        QZFL.imports("/qzone/app/jSolution/jSolution_1.0_qzone.js", function() {
                            j$.load({
                                id: "/requests/moodRequest:3.1:prototype",
                                onSuccess: function(e) {
                                    e.post({
                                        id: "publish_v6",
                                        data: t,
                                        onSuccess: function(e) {
                                            QZONE.FP.showMsgbox("已经成功发表说说", 4)
                                        },
                                        onError: function(e, t) {}
                                    })
                                }
                            })
                        })
                    }
                }),
                QPHOTO.dialog.editor.openTuya(i)
            }
            "undefined" == typeof QPHOTO || void 0 === QPHOTO.dialog ? seajs.use(["http://" + (siDomain || "qzonestyle.gtimg.cn") + "/qzone/client/photo/pages/qzone_v4/script/photo_logic.js", "http://" + (siDomain || "qzonestyle.gtimg.cn") + "/qzone/photo/zone/new/script/photoEditor.js"], function() {
                i(e, t)
            }) : i(e, t)
        },
        dispose: function() {
            this.alive = !1,
            this.btn.hide()
        }
    }),
    e
}),
define.pack("./plugins.video", ["photo.v7/lib/jquery", "v8/ic/videoManager/videoUtil", "./event", "./util", "./tmpl", "./plugins.h5Video"], function(require, exports, module) {
    var t, i, r = require("photo.v7/lib/jquery"), d = require("v8/ic/videoManager/videoUtil"), l = require("./event"), p = require("./util"), s = require("./tmpl"), a = require("./plugins.h5Video");
    try {
        i = QZONE.FP.getQzoneConfig("loginUin")
    } catch (e) {}
    var c = {
        log: 0
    }
      , h = !(d && d.config && d.config.supportReportPlayToCompass)
      , u = 204972326
      , m = 204972327
      , g = {
        1: 104974722,
        2: 104974723,
        3: 104974724,
        5: 104974725
    }
      , n = {
        1: 104975910
    };
    function f(e, t, i) {
        (c.log || i) && window.console && window.console.log("【video " + e + "】" + t)
    }
    function v() {
        return !1
    }
    var _ = {
        isCurrent: function() {
            return !1
        },
        isInited: function() {
            return !1
        },
        playInfo: function(e) {},
        pauseVideo: function() {},
        stopVideo: function() {},
        getDuration: function() {
            return 0
        },
        getPlaytime: function() {
            return 0
        },
        setPlaytime: function(e) {},
        showPopup: function(e) {},
        showViewMore: function(e) {}
    };
    return r.extend(c, {
        qzvFlash: null,
        qzvFlashWrap: null,
        h265Flash: null,
        h265FlashWrap: null,
        txvFlash: null,
        txvFlashWrap: null,
        hlsFlash: null,
        hlsFlashWrap: null,
        currFlash: null,
        currVideo: {
            videoIndex: -999,
            videoInfo: null,
            playOpt: null,
            flashWrap: _
        },
        init: function() {
            this.wrapper = r("#js-image-ctn"),
            this.dispose(),
            this.allVideo = "videoandrec" == slide.option.type || "video" == slide.option.type,
            this.autoNext = "videoandrec" == slide.option.type && !slide.option.noAutoPlay,
            this.alive = !0,
            this.bind(),
            slide._plugin_video = slide._plugin_video || c,
            this.playFakeFirstVideo()
        },
        bind: function() {
            var a;
            this._hasBindEvent || (this._hasBindEvent = !0,
            a = this,
            l.bind("playVideo", function(e, t) {
                if (c.alive) {
                    var i = (t = t || {}).photo || slide.photos[slide.index]
                      , o = i.isFakeFirstData ? -1 : slide.index;
                    if (c.currVideo.videoIndex = o,
                    c.currVideo.videoInfo = i,
                    c.currVideo.playOpt = t,
                    f(c.currVideo.videoIndex, "playVideo"),
                    c.allVideo || "video" == i.ugcType) {
                        if (2 != i.videoType) {
                            var n = d && d.getH265 && d.getH265(i)
                              , o = -1 < i.videoSrc.indexOf(".m3u8");
                            switch (!0) {
                            case n:
                                i.videoExtend = i.videoExtend || {},
                                i.videoExtend.useH265 = !0,
                                i.videoSrc = n,
                                i.videoUrl = n,
                                a._playH265Video(t);
                                break;
                            case o:
                                a._playHlsVideo(t);
                                break;
                            default:
                                a._playNewVideo(t)
                            }
                        } else
                            a._playTXVideo(t);
                        5 == i.videoType && 0 <= c.currVideo.videoIndex && a._reportLiveUserOnline()
                    }
                }
            }),
            l.bind("beforeGo", function(e, t) {
                c.alive && c.allVideo && (l.stopGo = "left" == t.direction && t.prev <= 0 || "right" == t.direction && t.prev >= slide.photos.length - 1)
            }),
            l.bind("onShowFakeFirstData", function(e, t) {
                a.stopVideo(),
                c.allVideo && a.playFakeFirstVideo()
            }),
            l.bind("onGetPhotosFail", function(e, t) {
                t = t || {},
                a.stopVideo(),
                c.alive && (c.autoNext = !1,
                c.allVideo && slide.fakeFirstData ? a.playFakeFirstVideo(!0) : a._showVideoTip("error", t.data && t.data.message || "服务器繁忙"))
            }),
            l.bind("go", function(e, t) {
                var i, o, n, s;
                c.alive && (0 == ((i = (t = t || {}).photo || slide.photos[slide.index]).isFakeFirstData ? -1 : slide.index) && -1 == c.currVideo.videoIndex || (a.stopVideo(),
                n = (o = c.allVideo || "video" == i.ugcType) && (c.allVideo || t.first),
                o && (n ? (n = 0,
                t.first && slide.option.playID && (n = slide.option.playID),
                s = r.extend({
                    photo: i,
                    playID: n
                }, t.opt),
                setTimeout(function() {
                    l.trigger("playVideo", s)
                }, 0)) : c._showVideoTip("play"))))
            }),
            l.bind("onFixImgPosition", function(e, t) {
                var i;
                c.alive && !c.allVideo && c.currVideo.videoInfo && c.currVideo.videoInfo.playerReady && (i = r("#js-img-disp"),
                r(c.currFlash).closest(".js-video-flash-ctn").css({
                    width: i.width(),
                    height: i.height(),
                    top: parseFloat(i.css("top")),
                    left: parseFloat(i.css("left"))
                }).show())
            }),
            l.bind("beforeClose", function() {
                a.dispose()
            }),
            l.bind("close", function() {
                a.dispose()
            }),
            r("#js-viewer-imgWraper").delegate(".js-video-play", p.evt.click, function() {
                l.trigger("playVideo")
            }))
        },
        playFakeFirstVideo: function(e) {
            var t;
            c.alive && slide.fakeFirstData && (c._showVideoTip("loading"),
            e && (t = {
                photo: slide.fakeFirstData,
                playID: slide.option.playID
            },
            setTimeout(function() {
                l.trigger("playVideo", t)
            }, 0)))
        },
        isRecVideo: function() {
            return slide.option.isRec || 0 < c.currVideo.videoIndex
        },
        _showVideoNextTip: function() {
            c._hideTipTimer && (clearTimeout(c._hideTipTimer),
            c._hideTipTimer = null);
            var e = r("#js-image-ctn")
              , t = e.siblings(".js-video-nexttip");
            0 == t.length && (e.after(s.video_nexttip),
            t = e.siblings(".js-video-nexttip")),
            t.show()
        },
        _hideVideoNextTip: function() {
            c._hideTipTimer && (clearTimeout(c._hideTipTimer),
            c._hideTipTimer = null);
            r("#js-image-ctn").siblings(".js-video-nexttip").hide()
        },
        _showVideoTip: function(e, t) {
            c._hideVideoNextTip();
            var i = r("#js-image-ctn");
            i.siblings(".js-video-singletip").hide();
            var o, n = s["video_" + e];
            n && (0 == (o = i.siblings(".js-video-singletip.js-video-" + e)).length && ("loading" == e ? i.before(n) : i.after(n),
            o = i.siblings(".js-video-singletip.js-video-" + e)),
            "error" === e && o.text(t || "视频无法播放"),
            o.show())
        },
        _startProgressTimer: function() {
            c.autoNext && !c._progressTimer && (c._checkShowNextTip() || (c._progressTimer = setInterval(c._checkShowNextTip, 1e3)))
        },
        _stopProgressTimer: function() {
            c._progressTimer && (clearInterval(c._progressTimer),
            c._progressTimer = null)
        },
        _checkShowNextTip: function() {
            if (!c.autoNext)
                return !1;
            try {
                var e = c.currVideo.flashWrap.getDuration()
                  , t = c.currVideo.flashWrap.getPlaytime();
                if (3 < e && e - t < 3 && !c.isFull)
                    return c._stopProgressTimer(),
                    c._showVideoNextTip(),
                    c._hideTipTimer && (clearTimeout(c._hideTipTimer),
                    c._hideTipTimer = null),
                    c._hideTipTimer = setTimeout(function() {
                        c._hideVideoNextTip(),
                        c._hideTipTimer = null
                    }, 3e3),
                    !0
            } catch (e) {}
            return c._hideTipTimer && c._hideVideoNextTip(),
            !1
        },
        _createPlayer: function(e, t, i, o) {
            var n = e === c._txVideoFlashId ? 2 : 1;
            if (d.supportH5Video({
                videoType: n
            }))
                return a.createPlayer(c, e, t, i, o);
            r("#" + e + "Ctn");
            n = r("#" + e),
            o = n[0];
            return o || (i = {
                id: e,
                name: e,
                wmode: "opaque",
                allowScriptAccess: "always",
                allowfullscreen: "true",
                allownetworking: "all",
                width: "100%",
                height: "100%",
                src: t,
                flashvars: i
            },
            i = QZFL.media.getFlashHtml(i),
            r("#js-image-ctn").append('<div class="js-video-flash-ctn" id="' + e + 'Ctn" style="position:absolute;top:-3px;left:-3px;width:3px;height:3px;z-index:10;">' + i + "</div>"),
            r("#" + e + "Ctn"),
            o = (n = r("#" + e))[0],
            QZFL.userAgent.firefox && (o.ondragstart = v,
            o.onselectstart = v,
            o.onmousedown = v,
            o.onclick = v)),
            o
        },
        _playVideo: function(e, t) {
            f(c.currVideo.videoIndex, "_playVideo: flashId=" + e),
            c._showVideoTip("loading");
            var i = c.currVideo.videoInfo;
            i.playerReady = !1,
            i.state = "",
            i.started = !1,
            i.stopped = !1,
            i.err = null,
            i.midError = null,
            i.timepoints = {
                loadFlash: new Date
            },
            d && (c._videoIdforReport = "viewer_video_" + c.currVideo.videoIndex,
            d.registerReportPlay(c._videoIdforReport, p.stat.getVideoInfo(i), {
                playID: c.currVideo.playOpt && c.currVideo.playOpt.playID,
                scene: c.isRecVideo() ? 5 : 4
            }));
            var o, n, s = r("#" + e + "Ctn");
            if (!QZFL.media.getFlashVersion().toNumber() && QZFL.userAgent.chrome ? (o = !c.allVideo && (o = r("#js-img-disp")).is(":visible") ? {
                width: o.width(),
                height: o.height(),
                top: parseFloat(o.css("top")),
                left: parseFloat(o.css("left"))
            } : {
                width: "100%",
                height: "100%",
                top: 0,
                left: 0
            },
            s.css(o).show()) : s.css({
                top: -3,
                left: -3,
                width: 3,
                height: 3
            }).show(),
            i.needReportResult = !0,
            d && d.triggerPlay(c._videoIdforReport, !(!c.currVideo.playOpt || !c.currVideo.playOpt.auto)),
            t)
                try {
                    t.isInited() && (i.timepoints && i.timepoints.loadFlash && (i.timepoints.loadFlashSucc = new Date),
                    c.currVideo.flashWrap = t)
                } catch (e) {}
            if (5 == i.videoType && (!i.videoExtend || 2 != i.videoExtend.type)) {
                if (i.videoExtend)
                    switch (i.videoExtend.type) {
                    case 1:
                        n = "正在直播，请移步手机观看";
                        break;
                    case 3:
                        n = "直播已结束，未保留回放";
                        break;
                    case 4:
                        n = "正在生成直播回放，请稍候"
                    }
                return n = n || "该直播无法观看",
                void c._showVideoTip("error", n)
            }
            c.currVideo.flashWrap.isInited() && (c.currVideo.flashWrap.playInfo(i),
            p.stat.pingpv("playVideo." + (c.isRecVideo() ? "rec" : "main") + "." + i.videoType));
            e = r("#" + e);
            e.attr("data-index", c.currVideo.videoIndex),
            c.currFlash = e[0],
            !h || (e = p.stat.getDataForReportToCompass(i)) && p.stat.reportCompass(r.extend(e, {
                actiontype: 3,
                subactiontype: e.source,
                reserves: e.share_source,
                is_auto_play: c.currVideo.playOpt && c.currVideo.playOpt.auto ? 1 : 2,
                video_play_scene: c.isRecVideo() ? 5 : 4
            }), "play.simple")
        },
        _playerInited: function(e, t) {
            var i = c.currVideo.videoInfo;
            i.playerReady = !1,
            i.state = "",
            i.started = !1,
            i.stopped = !1,
            i.err = null,
            i.midError = null,
            i.timepoints && i.timepoints.loadFlash && (i.timepoints.loadFlashSucc = new Date),
            QZFL.userAgent.chrome && r("#" + e + "Ctn").css({
                top: -3,
                left: -3,
                width: 3,
                height: 3
            }),
            c.currVideo.flashWrap = t;
            try {
                t.showPopup(!1),
                t.showViewMore(!1)
            } catch (e) {}
            (5 != i.videoType || i.videoExtend && 2 == i.videoExtend.type) && (t.playInfo(i),
            p.stat.pingpv("playVideo." + (c.isRecVideo() ? "rec" : "main") + "." + i.videoType))
        },
        _playerReady: function(e) {
            f(c.currVideo.videoIndex, "_playerReady"),
            c.currVideo.videoInfo.playerReady = !0,
            c._showVideoTip("none");
            var t, e = r("#" + e + "Ctn");
            t = !c.allVideo && (t = r("#js-img-disp")).is(":visible") ? {
                width: t.width(),
                height: t.height(),
                top: parseFloat(t.css("top")),
                left: parseFloat(t.css("left"))
            } : {
                width: "100%",
                height: "100%",
                top: 0,
                left: 0
            },
            e.css(t).show(),
            l.trigger("onVideoPlayerReady")
        },
        _playerError: function(e, t) {
            var i, o, n = c.currVideo.videoInfo;
            !n || n.err || n.stopped || (f(c.currVideo.videoIndex, "_playerError " + t.type + " " + t.detail, !0),
            n.err = t,
            c._showVideoTip("error", 5 == n.videoType ? "直播无法观看" : ""),
            i = -1,
            d && d.getVideoReturnCode && (i = d.getVideoReturnCode({
                err: t,
                playType: {
                    useH265: n.videoExtend && n.videoExtend.useH265,
                    midError: n.midError
                }
            }, p.stat.getVideoInfo(n))),
            d && d.setPlayResult(c._videoIdforReport, {
                scene: "viewer",
                code: i,
                err: t,
                playType: {
                    useH265: n.videoExtend && n.videoExtend.useH265,
                    midError: n.midError
                },
                message: "type=" + t.type + ",detail=" + t.detail + ",vkeyDelay=" + (+new Date - n.timeStamp)
            }, !n.needReportResult),
            n.needReportResult = !1,
            d && d.forceReportPlay(c._videoIdforReport),
            n.timepoints && n.timepoints.callPlay && !n.timepoints.callPlayError && (n.timepoints.callPlayError = new Date,
            PSY.oz.reportMD({
                fromId: u,
                toId: m,
                interfaceId: g[n.videoType],
                code: i,
                delay: n.timepoints.callPlayError - n.timepoints.callPlay,
                refer: "delaynolimit"
            }),
            o = n.videoExtend && n.videoExtend.useH265,
            PSY.oz.returnCodeV4({
                cgi: "/viewer2/playVideo/videoType_" + n.videoType + (o ? "/h265" : ""),
                domain: "photomonitor.qzone.qq.com",
                type: 2,
                code: i,
                time: n.timepoints.callPlayError - n.timepoints.callPlay,
                rate: 1
            })),
            p.stat.reportTextToCompass(["play video error:", "ownerUin : " + n.ownerUin, "appid : " + n.appid, "tid : " + n.tid, "videoUrl : " + n.videoUrl, "errorInfo : " + t.type + " " + t.detail, "hasStarted : " + !!n.started].join("\n"), "playvideo/error"))
        },
        _playerPlayStart: function(e) {
            var t, i = c.currVideo.videoInfo;
            i && (f(c.currVideo.videoIndex, "_playerPlayStart"),
            i.started = 1,
            i.stopped = 0,
            i.timepoints && i.timepoints.callPlay && !i.timepoints.callPlaySucc && (i.timepoints.callPlaySucc = new Date,
            PSY.oz.reportMD({
                fromId: u,
                toId: m,
                interfaceId: g[i.videoType],
                code: 0,
                delay: i.timepoints.callPlaySucc - i.timepoints.callPlay,
                refer: "delaynolimit"
            }),
            t = i.videoExtend && i.videoExtend.useH265,
            PSY.oz.returnCodeV4({
                cgi: "/viewer2/playVideo/videoType_" + i.videoType + (t ? "/h265" : ""),
                domain: "photomonitor.qzone.qq.com",
                type: 1,
                code: 0,
                time: i.timepoints.callPlaySucc - i.timepoints.callPlay,
                rate: 1
            }),
            t && !i.midError && PSY.oz.reportMD({
                fromId: u,
                toId: m,
                interfaceId: n[i.videoType],
                code: 0,
                delay: i.timepoints.callPlaySucc - i.timepoints.callPlay,
                refer: "delaynolimit"
            })))
        },
        _playerPlayStop: function(e) {
            var t = c.currVideo.videoInfo;
            t && t.started && !t.stopped && (f(c.currVideo.videoIndex, "_playerPlayStop"),
            t.stopped = 1,
            t.beginTime = 0,
            d && (d.isPlaying(c._videoIdforReport) ? d.setStopPlaying(c._videoIdforReport, 1e3 * c.currVideo.flashWrap.getPlaytime(), !0) : d.forceReportPlay(c._videoIdforReport)),
            c.autoNext && !c.isFull && setTimeout(function() {
                r("#js-btn-nextPhoto").trigger(p.evt.click, {
                    auto: !0
                })
            }))
        },
        _playerChangeState: function(e, t) {
            var i = c.currVideo.videoInfo;
            i && i.state != t && ("ended" == i.state && (i.needReportResult = !0,
            c.currVideo.playOpt && c.currVideo.playOpt.auto && (c.currVideo.playOpt.auto = !1),
            d && d.triggerPlay(c._videoIdforReport, !(!c.currVideo.playOpt || !c.currVideo.playOpt.auto))),
            "playing" == t ? c._startProgressTimer() : c._stopProgressTimer(),
            d && ("playing" == t ? (i.needReportResult && (i.needReportResult = !1,
            d && d.setPlayResult(c._videoIdforReport, {
                scene: "viewer",
                code: 0,
                playType: {
                    useH265: i.videoExtend && i.videoExtend.useH265,
                    midError: i.midError
                }
            })),
            d.setStartPlaying(c._videoIdforReport, 1e3 * c.currVideo.flashWrap.getPlaytime(), !(!c.currVideo.playOpt || !c.currVideo.playOpt.auto))) : "playing" == i.state && d.setStopPlaying(c._videoIdforReport, "ended" == t ? 1e3 * c.currVideo.flashWrap.getDuration() : 1e3 * c.currVideo.flashWrap.getPlaytime())),
            i.state = t)
        },
        _playerSlideStart: function(e) {
            c.currVideo.videoInfo
        },
        _playerSlideStop: function(e) {
            c.currVideo.videoInfo && d && d.addSeek && d.addSeek(c._videoIdforReport)
        },
        _playerChangeFull: function(e, t) {
            c.isFull = t,
            c.autoNext && !t && c._checkShowNextTip()
        },
        _newVideoFlashId: "videoViewer",
        _playNewVideo: function(e) {
            var t, i;
            r("#" + c._newVideoFlashId + "Ctn").show(),
            c.qzvFlash || (t = "slide._plugin_video._newVideoCallbacks",
            t = ["noloading=1", "onFlashInited=" + encodeURIComponent(t + ".onFlashInited"), "onMetaData=" + encodeURIComponent(t + ".onMetaData"), "onError=" + encodeURIComponent(t + ".onError"), "onChangeState=" + encodeURIComponent(t + ".onChangeState"), "onPlayStart=" + encodeURIComponent(t + ".onPlayStart"), "onPlayStop=" + encodeURIComponent(t + ".onPlayStop"), "onSlideStart=" + encodeURIComponent(t + ".onSlideStart"), "onSlideStop=" + encodeURIComponent(t + ".onSlideStop"), "onChangeFull=" + encodeURIComponent(t + ".onChangeFull")].join("&"),
            c.qzvFlash = c._createPlayer(c._newVideoFlashId, "//qzs.qq.com/qzone/client/photo/swf/MPlayer/MicroVideoPlayerEx.swf", t),
            i = c.qzvFlash,
            c.qzvFlashWrap = {
                isInited: function() {
                    return i.setUrl
                },
                playInfo: function(e) {
                    c.alive && e.videoUrl && /^(https?:)?\/\//.test(e.videoUrl) && (f(c.currVideo.videoIndex, "playNewVideo: videoUrl=" + e.videoUrl + ", beginTime=" + e.beginTime),
                    e.timepoints && (e.timepoints.callPlay = new Date),
                    i.setUrl(e.videoUrl),
                    i.playVideo(e.beginTime ? e.beginTime / 1e3 : 0))
                },
                pauseVideo: function() {
                    i.pauseVideo()
                },
                stopVideo: function() {
                    i.stopVideo()
                },
                getDuration: function() {
                    return i.getDuration()
                },
                getPlaytime: function() {
                    return i.getPlaytime()
                },
                setPlaytime: function(e) {
                    i.setPlaytime(e)
                },
                showPopup: function(e) {
                    i.showPopup(e)
                },
                showViewMore: function(e) {
                    i.showViewMore(e)
                }
            }),
            c._playVideo(c._newVideoFlashId, c.qzvFlashWrap)
        },
        _newVideoCallbacks: {
            isCurrent: function() {
                return c.currFlash && c.currFlash === c.qzvFlash && parseInt(r(c.currFlash).attr("data-index")) === c.currVideo.videoIndex
            },
            onFlashInited: function() {
                this.isCurrent() && c._playerInited(c._newVideoFlashId, c.qzvFlashWrap)
            },
            onMetaData: function(e) {
                var t;
                this.isCurrent() && ((t = c.currVideo.videoInfo).videoDuration || (t.videoDuration = parseInt(1e3 * c.currVideo.flashWrap.getDuration())),
                c._playerReady(c._newVideoFlashId))
            },
            onError: function(e, t) {
                c.alive ? this.isCurrent() && c._playerError(c._newVideoFlashId, {
                    type: e,
                    detail: t
                }) : f(c.currVideo.videoIndex, "not alive onError", !0)
            },
            onChangeState: function(e) {
                if (c.alive || "playing" != e)
                    this.isCurrent() && (f(c.currVideo.videoIndex, "onChangeState: " + e),
                    c._playerChangeState(c._newVideoFlashId, e));
                else {
                    f(c.currVideo.videoIndex, "not alive onChangeState: " + e, !0);
                    try {
                        c.qzvFlashWrap && c.qzvFlashWrap.stopVideo()
                    } catch (e) {}
                }
            },
            onPlayStart: function() {
                if (c.alive)
                    this.isCurrent() && (f(c.currVideo.videoIndex, "onPlayStart"),
                    c._playerPlayStart(c._newVideoFlashId));
                else {
                    f(c.currVideo.videoIndex, "not alive onPlayStart", !0);
                    try {
                        c.qzvFlashWrap && c.qzvFlashWrap.stopVideo()
                    } catch (e) {}
                }
            },
            onPlayStop: function() {
                c.alive ? this.isCurrent() && (f(c.currVideo.videoIndex, "onPlayStop"),
                c._playerPlayStop(c._newVideoFlashId)) : f(c.currVideo.videoIndex, "not alive onPlayStop", !0)
            },
            onSlideStart: function() {
                this.isCurrent() && (f(c.currVideo.videoIndex, "onSlideStart"),
                c._playerSlideStart(c._newVideoFlashId))
            },
            onSlideStop: function() {
                this.isCurrent() && (f(c.currVideo.videoIndex, "onSlideStop"),
                c._playerSlideStop(c._newVideoFlashId))
            },
            onChangeFull: function(e) {
                this.isCurrent() && (f(c.currVideo.videoIndex, "onChangeFull: " + e),
                c._playerChangeFull(c._newVideoFlashId, e))
            }
        },
        _hlsVideoFlashId: "videoViewerHls",
        _playHlsVideo: function(e) {
            var t, i;
            r("#" + c._hlsVideoFlashId + "Ctn").show(),
            c.hlsFlash || (t = "slide._plugin_video._hlsVideoCallbacks",
            t = ["noloading=1", "onFlashInited=" + encodeURIComponent(t + ".onFlashInited"), "onMetaData=" + encodeURIComponent(t + ".onMetaData"), "onError=" + encodeURIComponent(t + ".onError"), "onChangeState=" + encodeURIComponent(t + ".onChangeState"), "onPlayStart=" + encodeURIComponent(t + ".onPlayStart"), "onPlayStop=" + encodeURIComponent(t + ".onPlayStop"), "onSlideStart=" + encodeURIComponent(t + ".onSlideStart"), "onSlideStop=" + encodeURIComponent(t + ".onSlideStop"), "onChangeFull=" + encodeURIComponent(t + ".onChangeFull")].join("&"),
            c.hlsFlash = c._createPlayer(c._hlsVideoFlashId, "//qzs.qq.com/qzone/client/photo/swf/MPlayer/MicroVideoPlayerEx.swf", t),
            i = c.hlsFlash,
            c.hlsFlashWrap = {
                isInited: function() {
                    return i.setUrl
                },
                playInfo: function(e) {
                    c.alive && e.videoUrl && /^(https?:)?\/\//.test(e.videoUrl) && (f(c.currVideo.videoIndex, "playHlsVideo: videoUrl=" + e.videoUrl + ", beginTime=" + e.beginTime),
                    e.timepoints && (e.timepoints.callPlay = new Date),
                    i.setUrl(e.videoUrl),
                    i.playVideo(e.beginTime ? e.beginTime / 1e3 : 0))
                },
                pauseVideo: function() {
                    i.pauseVideo()
                },
                stopVideo: function() {
                    i.stopVideo()
                },
                getDuration: function() {
                    return i.getDuration()
                },
                getPlaytime: function() {
                    return i.getPlaytime()
                },
                setPlaytime: function(e) {
                    i.setPlaytime(e)
                },
                showPopup: function(e) {
                    i.showPopup(e)
                },
                showViewMore: function(e) {
                    i.showViewMore(e)
                }
            }),
            c._playVideo(c._hlsVideoFlashId, c.hlsFlashWrap)
        },
        _hlsVideoCallbacks: {
            isCurrent: function() {
                return c.currFlash && c.currFlash === c.hlsFlash && parseInt(r(c.currFlash).attr("data-index")) === c.currVideo.videoIndex
            },
            onFlashInited: function() {
                this.isCurrent() && c._playerInited(c._hlsVideoFlashId, c.hlsFlashWrap)
            },
            onMetaData: function(e) {
                var t;
                this.isCurrent() && ((t = c.currVideo.videoInfo).videoDuration || (t.videoDuration = parseInt(1e3 * c.currVideo.flashWrap.getDuration())),
                c._playerReady(c._hlsVideoFlashId))
            },
            onError: function(e, t) {
                c.alive ? this.isCurrent() && c._playerError(c._hlsVideoFlashId, {
                    type: e,
                    detail: t
                }) : f(c.currVideo.videoIndex, "not alive onError", !0)
            },
            onChangeState: function(e) {
                if (c.alive || "playing" != e)
                    this.isCurrent() && (f(c.currVideo.videoIndex, "onChangeState: " + e),
                    c._playerChangeState(c._hlsVideoFlashId, e));
                else {
                    f(c.currVideo.videoIndex, "not alive onChangeState: " + e, !0);
                    try {
                        c.hlsFlashWrap && c.hlsFlashWrap.stopVideo()
                    } catch (e) {}
                }
            },
            onPlayStart: function() {
                if (c.alive)
                    this.isCurrent() && (f(c.currVideo.videoIndex, "onPlayStart"),
                    c._playerPlayStart(c._hlsVideoFlashId));
                else {
                    f(c.currVideo.videoIndex, "not alive onPlayStart", !0);
                    try {
                        c.hlsFlashWrap && c.hlsFlashWrap.stopVideo()
                    } catch (e) {}
                }
            },
            onPlayStop: function() {
                c.alive ? this.isCurrent() && (f(c.currVideo.videoIndex, "onPlayStop"),
                c._playerPlayStop(c._hlsVideoFlashId)) : f(c.currVideo.videoIndex, "not alive onPlayStop", !0)
            },
            onSlideStart: function() {
                this.isCurrent() && (f(c.currVideo.videoIndex, "onSlideStart"),
                c._playerSlideStart(c._hlsVideoFlashId))
            },
            onSlideStop: function() {
                this.isCurrent() && (f(c.currVideo.videoIndex, "onSlideStop"),
                c._playerSlideStop(c._hlsVideoFlashId))
            },
            onChangeFull: function(e) {
                this.isCurrent() && (f(c.currVideo.videoIndex, "onChangeFull: " + e),
                c._playerChangeFull(c._hlsVideoFlashId, e))
            }
        },
        _h265VideoFlashId: "videoViewerH265",
        _playH265Video: function(e) {
            var t, i;
            r("#" + c._h265VideoFlashId + "Ctn").show(),
            c.h265Flash || (t = "slide._plugin_video._h265VideoCallbacks",
            t = ["noloading=1", "onFlashInited=" + encodeURIComponent(t + ".onFlashInited"), "onChangePlayer=" + encodeURIComponent(t + ".onChangePlayer"), "onMetaData=" + encodeURIComponent(t + ".onMetaData"), "onError=" + encodeURIComponent(t + ".onError"), "onChangeState=" + encodeURIComponent(t + ".onChangeState"), "onPlayStart=" + encodeURIComponent(t + ".onPlayStart"), "onPlayStop=" + encodeURIComponent(t + ".onPlayStop"), "onSlideStart=" + encodeURIComponent(t + ".onSlideStart"), "onSlideStop=" + encodeURIComponent(t + ".onSlideStop"), "onChangeFull=" + encodeURIComponent(t + ".onChangeFull")].join("&"),
            c.h265Flash = c._createPlayer(c._h265VideoFlashId, "//qzs.qq.com/qzone/client/photo/swf/MPlayer/MicroVideoPlayerH265.swf", t),
            i = c.h265Flash,
            c.h265FlashWrap = {
                isInited: function() {
                    return i.setUrl
                },
                playInfo: function(e) {
                    c.alive && e.videoUrl && /^(https?:)?\/\//.test(e.videoUrl) && (f(c.currVideo.videoIndex, "playNewVideo: videoUrl=" + e.videoUrl + ", beginTime=" + e.beginTime),
                    e.timepoints && (e.timepoints.callPlay = new Date),
                    i.setUrl(e.videoUrl, {
                        vurlBak: e.videoExtend.h264
                    }),
                    i.playVideo(e.beginTime ? e.beginTime / 1e3 : 0))
                },
                pauseVideo: function() {
                    i.pauseVideo()
                },
                stopVideo: function() {
                    i.stopVideo()
                },
                getDuration: function() {
                    return i.getDuration()
                },
                getPlaytime: function() {
                    return i.getPlaytime()
                },
                setPlaytime: function(e) {
                    i.setPlaytime(e)
                },
                showPopup: function(e) {
                    i.showPopup(e)
                },
                showViewMore: function(e) {
                    i.showViewMore(e)
                }
            }),
            c._playVideo(c._h265VideoFlashId, c.h265FlashWrap)
        },
        _h265VideoCallbacks: {
            isCurrent: function() {
                return c.currFlash && c.currFlash === c.h265Flash && parseInt(r(c.currFlash).attr("data-index")) === c.currVideo.videoIndex
            },
            onFlashInited: function() {
                this.isCurrent() && c._playerInited(c._h265VideoFlashId, c.h265FlashWrap)
            },
            onChangePlayer: function(e, t) {
                var i, o;
                this.isCurrent() && ((i = c.currVideo.videoInfo).midError || (o = -1,
                d && d.getVideoReturnCode && (o = d.getVideoReturnCode({
                    err: {
                        type: e,
                        detail: t
                    },
                    playType: {
                        useH265: !0,
                        midError: null
                    }
                }, p.stat.getVideoInfo(i))),
                f(c.currVideo.videoIndex, "onChangePlayer " + e + " " + t, !0),
                i.midError = {
                    type: e,
                    detail: t,
                    code: o,
                    time: new Date
                },
                i.timepoints && i.timepoints.callPlay && !i.timepoints.callPlayMidError && (i.timepoints.callPlayMidError = i.midError.time,
                PSY.oz.reportMD({
                    fromId: u,
                    toId: m,
                    interfaceId: n[i.videoType],
                    code: o,
                    delay: i.midError.time - i.timepoints.callPlay,
                    refer: "delaynolimit"
                })),
                p.stat.reportTextToCompass(["onChangePlayer:", "ownerUin : " + i.ownerUin, "appid : " + i.appid, "tid : " + i.tid, "videoUrl : " + i.videoUrl, "errorInfo : " + e + " " + t, "hasStarted : " + !!i.started].join("\n"), "playvideo/error")))
            },
            onMetaData: function(e) {
                var t;
                this.isCurrent() && ((t = c.currVideo.videoInfo).videoDuration || (t.videoDuration = parseInt(1e3 * c.currVideo.flashWrap.getDuration())),
                c._playerReady(c._h265VideoFlashId))
            },
            onError: function(e, t) {
                c.alive ? this.isCurrent() && c._playerError(c._h265VideoFlashId, {
                    type: e,
                    detail: t
                }) : f(c.currVideo.videoIndex, "not alive onError", !0)
            },
            onChangeState: function(e) {
                if (c.alive || "playing" != e)
                    this.isCurrent() && (f(c.currVideo.videoIndex, "onChangeState: " + e),
                    c._playerChangeState(c._h265VideoFlashId, e));
                else {
                    f(c.currVideo.videoIndex, "not alive onChangeState: " + e, !0);
                    try {
                        c.h265FlashWrap && c.h265FlashWrap.stopVideo()
                    } catch (e) {}
                }
            },
            onPlayStart: function() {
                if (c.alive)
                    this.isCurrent() && (f(c.currVideo.videoIndex, "onPlayStart"),
                    c._playerPlayStart(c._h265VideoFlashId));
                else {
                    f(c.currVideo.videoIndex, "not alive onPlayStart", !0);
                    try {
                        c.h265FlashWrap && c.h265FlashWrap.stopVideo()
                    } catch (e) {}
                }
            },
            onPlayStop: function() {
                c.alive ? this.isCurrent() && (f(c.currVideo.videoIndex, "onPlayStop"),
                c._playerPlayStop(c._h265VideoFlashId)) : f(c.currVideo.videoIndex, "not alive onPlayStop", !0)
            },
            onSlideStart: function() {
                this.isCurrent() && (f(c.currVideo.videoIndex, "onSlideStart"),
                c._playerSlideStart(c._h265VideoFlashId))
            },
            onSlideStop: function() {
                this.isCurrent() && (f(c.currVideo.videoIndex, "onSlideStop"),
                c._playerSlideStop(c._h265VideoFlashId))
            },
            onChangeFull: function(e) {
                this.isCurrent() && (f(c.currVideo.videoIndex, "onChangeFull: " + e),
                c._playerChangeFull(c._h265VideoFlashId, e))
            }
        },
        _txVideoFlashId: "txVideoViewer",
        _playTXVideo: function(e) {
            var t, i, o, n, s = c.currVideo.videoInfo;
            d ? d.isTXVideoSrc(s.videoUrl) ? (r("#" + c._txVideoFlashId + "Ctn").show(),
            d.registerTXVideo(c._txVideoFlashId, {}, c._txVideoCallbacks),
            t = "slide._plugin_video._txVideoCallbacks",
            i = s.videoId.replace("http://v.qq.com/", ""),
            s = (s.videoUrl || "").split("?"),
            o = (s[0] || "").replace(/^http:\/\//, "//"),
            n = [(s[1] || "").replace(i, ""), "auto=0&list=2&share=0&showend=0&showcfg=0&shownext=0", "onFlashInited=" + encodeURIComponent(t + ".__tenplay_playerInit"), "onError=" + encodeURIComponent(t + ".__tenplay_error"), "onPlayStart=" + encodeURIComponent(t + ".__tenplay_thisplay"), "onChangeFull=" + encodeURIComponent(t + ".__tenplay_ismax"), "onChangeState=" + encodeURIComponent(t + ".onChangeState"), "onSlideStart=" + encodeURIComponent(t + ".onSlideStart"), "onSlideStop=" + encodeURIComponent(t + ".onSlideStop"), "onPlayStop=" + encodeURIComponent(t + ".__tenplay_nextplay")].join("&"),
            c.txvFlashWrap = {
                isInited: function() {
                    return !0
                },
                playInfo: function(e) {
                    var t = e.videoId.replace("http://v.qq.com/", "");
                    c.alive && t && (f(c.currVideo.videoIndex, "playTXVideo: vid=" + t + ", beginTime=" + e.beginTime),
                    e.timepoints && (e.timepoints.callPlay = new Date),
                    c.txvFlash ? c.txvFlash.loadAndPlayVideoV2({
                        vid: t,
                        t: e.beginTime ? e.beginTime / 1e3 : 0
                    }) : c.txvFlash = c._createPlayer(c._txVideoFlashId, o, n, {
                        vid: t,
                        starttime: e.beginTime ? e.beginTime / 1e3 : 0
                    }))
                },
                pauseVideo: function() {
                    c.txvFlash && c.txvFlash.pauseVideo()
                },
                stopVideo: function() {
                    c.txvFlash && c.txvFlash.stopVideo()
                },
                getDuration: function() {
                    return c.txvFlash && c.txvFlash.getDuration()
                },
                getPlaytime: function() {
                    return c.txvFlash && c.txvFlash.getPlaytime()
                },
                setPlaytime: function(e) {
                    c.txvFlash && c.txvFlash.setPlaytime(e)
                },
                showPopup: function(e) {
                    c.txvFlash && c.txvFlash.showPopUpCfg(e)
                },
                showViewMore: function(e) {
                    c.txvFlash && c.txvFlash.showClickMore(e)
                }
            },
            c._playVideo(c._txVideoFlashId, c.txvFlashWrap),
            c.currVideo.flashWrap != _ && c._playerReady(c._txVideoFlashId)) : QZONE.FP.showMsgbox("视频url错误", 5, 2e3) : QZONE.FP.showMsgbox("视频模块错误", 5, 2e3)
        },
        _txVideoCallbacks: {
            onChangeState: function(e) {
                if (c.alive || "playing" != e)
                    this.isCurrent() && (f(c.currVideo.videoIndex, "onChangeState: " + e),
                    c._playerChangeState(c._txVideoFlashId, e));
                else {
                    f(c.currVideo.videoIndex, "not alive onChangeState: " + e, !0);
                    try {
                        c.txvFlashWrap && c.txvFlashWrap.stopVideo()
                    } catch (e) {}
                }
            },
            onSlideStart: function() {
                c._playerSlideStart(c._txVideoFlashId)
            },
            onSlideStop: function() {
                c._playerSlideStop(c._txVideoFlashId)
            },
            isCurrent: function() {
                return c.currFlash && c.currFlash === c.txvFlash && parseInt(r(c.currFlash).attr("data-index")) === c.currVideo.videoIndex
            },
            __tenplay_playerInit: function() {
                this.isCurrent() && (c._playerInited(c._txVideoFlashId, c.txvFlashWrap),
                c._playerReady(c._txVideoFlashId))
            },
            __tenplay_thisplay: function(e) {
                if (c.alive) {
                    var t;
                    this.isCurrent() && (f(c.currVideo.videoIndex, "__tenplay_thisplay"),
                    (t = c.currVideo.videoInfo).videoDuration || (t.videoDuration = parseInt(1e3 * c.currVideo.flashWrap.getDuration())),
                    c._playerPlayStart(c._txVideoFlashId))
                } else {
                    f(c.currVideo.videoIndex, "not alive __tenplay_thisplay", !0);
                    try {
                        c.txvFlashWrap && c.txvFlashWrap.stopVideo()
                    } catch (e) {}
                }
            },
            __tenplay_nextplay: function(e) {
                c.alive ? this.isCurrent() && (f(c.currVideo.videoIndex, "__tenplay_nextplay"),
                c._playerPlayStop(c._txVideoFlashId)) : f(c.currVideo.videoIndex, "not alive __tenplay_nextplay", !0)
            },
            __tenplay_onMessage: function(e) {
                if (c.alive || 0 != e && 3 != e && 5 != e) {
                    if (this.isCurrent())
                        switch (f(c.currVideo.videoIndex, "__tenplay_onMessage: msgId=" + e),
                        e) {
                        case 0:
                        case 3:
                        case 5:
                            c._playerChangeState(c._txVideoFlashId, "playing");
                            break;
                        case 1:
                            c._playerChangeState(c._txVideoFlashId, "pause");
                            break;
                        case 6:
                            c._playerChangeState(c._txVideoFlashId, "ended")
                        }
                } else {
                    f(c.currVideo.videoIndex, "not alive __tenplay_onMessage " + e, !0);
                    try {
                        c.txvFlashWrap && c.txvFlashWrap.stopVideo()
                    } catch (e) {}
                }
            },
            __tenplay_onClick: function(e) {
                if (this.isCurrent())
                    switch (f(c.currVideo.videoIndex, "__tenplay_onClick: action=" + e),
                    e) {
                    case "seekstart":
                        c._playerSlideStart(c._txVideoFlashId),
                        c._playerChangeState(c._txVideoFlashId, "pause");
                        break;
                    case "seekstop":
                        c._playerSlideStop(c._txVideoFlashId)
                    }
            },
            __tenplay_error: function(e) {
                c.alive ? this.isCurrent() && (e = e || {},
                c._playerError(c._txVideoFlashId, {
                    type: "tenplayError",
                    detail: e.code + ":" + e.info
                })) : f(c.currVideo.videoIndex, "not alive __tenplay_error", !0)
            },
            __tenplay_ismax: function(e) {
                this.isCurrent() && c._playerChangeFull(c._txVideoFlashId, e)
            }
        },
        _oldVideoFlashId: "oldVideoViewer",
        _playOldVideo: function() {
            c._showVideoTip("none");
            var e = c.currVideo.videoInfo
              , t = (e.videoUrl || "").replace(/^http:\/\//, "//")
              , i = r("#" + c._oldVideoFlashId)
              , o = r("#js-img-disp");
            i && i.length ? i.attr("data", t) : (t = QZFL.media.getFlashHtml({
                id: c._oldVideoFlashId,
                src: t,
                width: e.width,
                height: e.height,
                wmode: "transparent",
                allowscriptaccess: "never",
                allowfullscreen: "true",
                allownetworking: "all",
                flashvars: "playMovie=true&isAutoPlay=true&auto=1&autoPlay=true&adss=0&clientbar=0&showend=0&searchpanel=0&bullet=0&source=qzone.qq.com"
            }),
            r("#js-image-ctn").append(t),
            (i = r("#" + c._oldVideoFlashId)).bind(p.evt.click, function(e) {
                return !1
            })),
            i.attr("data-index", c.currVideo.videoIndex),
            c.currFlash = i[0],
            ("videoandrec" == slide.option.type ? i.css({
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                position: "absolute",
                "z-index": 10
            }) : i.css({
                width: e.width,
                height: e.height,
                top: parseFloat(o.css("top")),
                left: parseFloat(o.css("left")),
                position: "absolute",
                "z-index": 10
            })).show()
        },
        _reportLiveUserOnline: function() {
            var o = c.currVideo.videoIndex
              , n = slide.photos[o];
            if (n && 5 == n.videoType && n.videoExtend && n.videoExtend.roomId && !n.videoExtend.onlineReported) {
                n.videoExtend.onlineReported = !0;
                var s = r.Deferred()
                  , e = {
                    uid: i,
                    roomId: n.videoExtend.roomId,
                    type: 1,
                    relativeTime: 0
                };
                return PSY.ajax.request({
                    type: "get",
                    url: "//h5.qzone.qq.com/webapp/jsonp/live_qz/userOnline",
                    data: PSY.webapp.flatObj(e),
                    requestType: "jsonp",
                    dataType: "jsonp",
                    cache: !1,
                    timeout: 1e4,
                    charsetType: "utf-8",
                    scriptCharset: "utf-8",
                    qzoneCoolCbName: !0,
                    noCodeDeal: !0,
                    noNeedAutoXss: 1,
                    success: function(e) {
                        if (c.alive)
                            if (0 === (e = e || {}).ret) {
                                var t, i = e.data && e.data.liveShowRoomInfo;
                                if (n.videoExtend._roomInfo = i,
                                i && (4 == n.videoExtend.type || !n.videoSrc || !/^(https?:)?\/\//.test(n.videoSrc)) && i.isRecordVideo && i.recordPlayInfo && 2 == i.recordPlayInfo.status) {
                                    try {
                                        t = i.recordPlayInfo.video_info_vec[0].play_info_vec[0]
                                    } catch (e) {}
                                    t = t || {},
                                    n.videoExtend.oriType = n.videoExtend.type,
                                    n.videoExtend.type = 2,
                                    n.videoExtend.url = t.url || "",
                                    n.videoExtend.allCount = parseInt(i.recordPlayInfo.totalCount) || 0,
                                    n.videoSrc = t.url || "",
                                    n.videoWidth = parseInt(t.vwidth) || 0,
                                    n.videoHeight = parseInt(t.vheight) || 0,
                                    p.processSingleVideoRecData(n, new Date),
                                    l.trigger("liveTypeChanged", {
                                        index: o
                                    }),
                                    c.currVideo.videoIndex == o && (c._showVideoTip("loading"),
                                    c.currVideo.flashWrap.isInited() && (c.currVideo.flashWrap.playInfo(n),
                                    p.stat.pingpv("playVideo." + (c.isRecVideo() ? "rec" : "main") + "." + n.videoType)))
                                }
                                s.resolve(e)
                            } else
                                f(o, "userOnline svr error: ret=" + e.ret + ", msg=" + e.msg, !0),
                                n.videoExtend._roomError = e,
                                n.videoExtend.oriType = n.videoExtend.type,
                                n.videoExtend.type = -1,
                                n.videoExtend.url = "",
                                n.videoExtend.allCount = 0,
                                n.videoSrc = "",
                                n.videoWidth = 0,
                                n.videoHeight = 0,
                                p.processSingleVideoRecData(n, new Date),
                                l.trigger("liveTypeChanged", {
                                    index: o
                                }),
                                c.currVideo.videoIndex == o && (c.stopVideo(),
                                c._showVideoTip("error", n.videoExtend._roomError.msg || "该直播无法观看")),
                                s.reject(e)
                    },
                    error: function(e) {
                        c.alive && ((e = e || {
                            ret: -1,
                            msg: "服务器繁忙"
                        }).ret === t && e.code !== t && (e.ret = e.code),
                        e.msg === t && e.message !== t && (e.msg = e.message),
                        f(currIndex, "userOnline error: ret=" + e.ret + ", msg=" + e.msg, !0),
                        s.reject(e || {
                            ret: -1,
                            msg: "服务器繁忙"
                        }))
                    }
                }),
                s.promise()
            }
        },
        stopVideo: function() {
            c._stopProgressTimer(),
            c._showVideoTip("none");
            var e, t = c.currVideo.videoIndex, i = c.currVideo.videoInfo, o = d && d.getPlayID && d.getPlayID(c._videoIdforReport) || 0;
            if (r(this.currFlash).attr("data-index", ""),
            i && (i.timepoints = null,
            i.needReportResult = !1),
            d && (d.isPlaying(c._videoIdforReport) ? d.setStopPlaying(c._videoIdforReport, 1e3 * c.currVideo.flashWrap.getPlaytime(), !0) : d.forceReportPlay(c._videoIdforReport),
            d.unregisterReportPlay(c._videoIdforReport),
            c._videoIdforReport = "",
            d.unregisterTXVideo(c._txVideoFlashId)),
            "videoandrec" == slide.option.type && i && i.started) {
                if (i.stopped)
                    i.beginTime = 0,
                    i.playID = 0;
                else
                    try {
                        var n = 1e3 * c.currVideo.flashWrap.getPlaytime();
                        f(t, "stopVideo: time=" + n),
                        i.beginTime = n,
                        i.playID = o
                    } catch (e) {}
                i !== slide.fakeFirstData || (e = slide.photos[0]) && (e.beginTime = slide.fakeFirstData.beginTime,
                e.playID = slide.fakeFirstData.playID)
            }
            try {
                c.currVideo.flashWrap.pauseVideo(),
                c.currVideo.flashWrap.stopVideo()
            } catch (e) {}
            c.currVideo.flashWrap = _,
            c.currVideo.videoIndex = -999,
            c.currVideo.videoInfo = null,
            c.currVideo.playOpt = null,
            c.isFull = !1,
            c.currFlash = null;
            r(".js-video-flash-ctn").css({
                top: -3,
                left: -3,
                width: 3,
                height: 3
            }),
            r("#" + c._oldVideoFlashId).hide().attr("data", "").remove()
        },
        dispose: function() {
            this.stopVideo(),
            r(".js-video-flash-ctn").hide(),
            this.currFlash = null,
            this.allVideo = !1,
            this.autoNext = !1,
            this.alive = !1
        }
    }),
    c
}),
define.pack("./plugins.webp", ["photo.v7/lib/jquery", "./event", "./util"], function(e, exports, module) {
    var t = e("photo.v7/lib/jquery")
      , e = (e("./event"),
    e("./util"),
    {});
    return t.extend(e, {
        init: function() {
            this.wrapper = t("#js-image-ctn"),
            this.alive = !0,
            this.bind()
        },
        bind: function() {
            if (!this._hasBindEvent) {
                this._hasBindEvent = !0;
                return !1
            }
        },
        dispose: function() {
            this.alive = !1
        }
    }),
    e
}),
define.pack("./slide", ["photo.v7/lib/jquery", "photo.v7/lib/photo", "./event", "./tmpl", "./viewer", "./thumbNail", "./infoArea", "./like", "./config", "./api.photos", "./util"], function(require, exports, module) {
    var s, l = require("photo.v7/lib/jquery"), r = require("photo.v7/lib/photo"), p = require("./event"), d = require("./tmpl"), o = require("./viewer"), n = require("./thumbNail"), a = require("./infoArea"), c = require("./like"), h = require("./config"), i = require("./api.photos"), u = require("./util"), e = u.evt, m = {}, g = 0, f = 0, v = 1, _ = [];
    return l.extend(m, {
        init: function(e) {
            if (!l("#js-viewer-container").is(":visible")) {
                if (!h[e.appid])
                    return QZONE.FP.showMsgbox("错误的appid:" + e.appid, 5, 2e3),
                    void this.close();
                if (p.init(),
                this.event = p,
                this.setMode(this.getMode() || "normal"),
                "hd" == this.getMode() && this.setLastMode(),
                this.option = e,
                this.singleImg = !1,
                this.components = [],
                this.photos = [],
                this.dataSucc = !1,
                this.imgCache = this.imgCache || {},
                this.offset = 0,
                this.last = !1,
                this.index = 0,
                this.initConfig(e),
                this.initBodyStyle(),
                this.initLayer(e),
                this.initStyle(),
                this.wrapper = l("#js-viewer-container"),
                this.sideBarCtn = l("#js-sidebar-ctn").show(),
                this.initPanel(),
                this.bind(),
                m && m.option && 1 == m.option.ischild && l(document.body).addClass("os-win7"),
                this.needResumeMusic = !1,
                "video" == e.type || "videoandrec" == e.type)
                    try {
                        this.needResumeMusic = QZONE.music.isPlaying(),
                        QZONE.music.pauseMusic()
                    } catch (e) {}
                u.checkWebpAsync(function(e) {
                    e ? u.stat.pingpv("openViewer.supportWebp") : u.stat.pingpv("openViewer.noWebp"),
                    m.supportWebp ? u.stat.pingpv("openViewer.supportWebp") : !1 === m.supportWebp && u.stat.pingpv("openViewer.noWebp")
                }),
                this.run(),
                ua && ua.chrome || ua && ua.webkit ? u.stat.pingpv("openViewer.chrome") : ua && ua.ie ? u.stat.pingpv("openViewer.ie") : u.stat.pingpv("openViewer.other"),
                u.stat.reportPV()
            }
        },
        bind: function() {
            var a;
            this._hasBindEvent || (this._hasBindEvent = !0,
            a = this,
            p.bind("onGetPhotos", function(e, t) {
                var i = t && t.data || {};
                if ("311" == m.config.appid && t.first) {
                    var o = t.param && t.param.picKey || ""
                      , n = m.photos[m.index].picKey
                      , s = o.split(",")
                      , o = n.split(",")
                      , n = s[s.length - 1]
                      , s = o[o.length - 1];
                    if (-1 < n.indexOf("^||s.png") && (n = n.replace("^||s.png", "^||m.png")) !== s)
                        return a.showSingleImg({
                            message: "拉取说说图片信息失败，可能是图片已删除，请刷新页面再试",
                            hideThumbs: !0,
                            hideFigureArea: !0
                        }),
                        !1
                }
                o = m.photos[m.index],
                n = l("#js-figure-area .js-hd-button"),
                s = l("#js-figure-area .js-large-button");
                o && o.origin ? (n.show(),
                s.hide()) : (n.hide(),
                s.show()),
                o && "photo" === o.ugcType && !t.data.topic && (t.data.topic = {
                    bitmap: o.bitmap || "10000000",
                    desc: o.desc,
                    descType: o.desctype,
                    index: "0",
                    loginName: "",
                    ownerName: o.ownerName,
                    ownerUin: o.ownerUin,
                    priv: 1,
                    pypriv: 1,
                    topicId: o.topicId,
                    topicName: o.topicName
                },
                m.topic = t.data.topic),
                t.first && m.config.getListAfterFirst && setTimeout(function() {
                    m.getPhotoList()
                }, 0),
                l.each(i.photos, function(e, t) {
                    t.pre = t.pre.replace(/\/[mabico]\//, "/a/"),
                    2 !== t.phototype && "video" != t.ugcType || (t.faceList = null,
                    t.facerect = null),
                    t.picId && t.picKey && "," === t.picId.charAt(0) && (t.picId = t.ownerUin + t.picId,
                    t.picKey = t.picKey.replace(",,", "," + t.ownerUin + ","))
                })
            }),
            p.bind("onGetPhotosFail", function(e, t) {
                a.showSingleImg(t.data)
            }),
            p.bind("showSideBarButtons", function() {
                a.showSideBarButtons()
            }),
            p.bind("openFavMode", function(e) {
                a.openFavMode(e)
            }),
            l("#js-viewer-container").on("openChildSlide", function(e, t) {
                try {
                    "comment" != m.option.type && m.openChildSlide(t)
                } catch (e) {}
                return !1
            }),
            p.bind("close", function() {
                var e = m._firstPhotoIndex
                  , e = (m.index,
                m.photos[e]);
                m.photos[m.index];
                e && (e = 0,
                "full" == m.getMode() ? e = -1 : "hd" == m.getMode() && (e = -2),
                u.stat.returnCode({
                    flag1: 110337,
                    code: e
                }))
            }),
            l("#js-viewer-container").on("click", ".js-report-btn", function(e) {
                e.preventDefault();
                e = m.photos && m.photos[m.index];
                e && (u.stat.pingpv("report"),
                421 == m.config.appid || 422 == m.config.appid ? QZONE.FP.showReportBox({
                    appname: "im",
                    subapp: "gzphoto",
                    jubaotype: "picture",
                    uin: r.user.getLoginUin(),
                    guin: e.groupId,
                    photoid: e.picKey,
                    albumid: e.albumId
                }) : QZONE.FP.showReportBox({
                    appname: "qzone",
                    subapp: "photo",
                    jubaotype: "picture",
                    uin: e.ownerUin,
                    lloc: escapeURI(e.lloc),
                    sloc: escapeURI(e.sloc || ""),
                    url: escapeURI(e.url),
                    blogtype: QZONE.FP.getBitMapFlag(7),
                    albumid: e.albumId
                }))
            }),
            p.bind("imgShowDone imgShowOrigin imgShowNormal afterWindowResize onSetDescHtml", function(e) {
                setTimeout(function() {
                    var e = l("#js-img-disp")
                      , t = parseInt(e.css("top"))
                      , e = 0 < (e = parseInt(e.css("left"))) ? e : 0
                      , t = 0 < t ? t : 0;
                    l("#js-link-hd").css({
                        right: e + 14,
                        top: t + 14
                    });
                    t = m.photos && m.photos[m.index];
                    t && t.raw && "normal" == m.getMode() && l("#js-link-hd").attr("canBeShow") && 2 != t.phototype && "video" != t.ugcType ? l("#js-link-hd").show() : l("#js-link-hd").hide()
                }, 0)
            }),
            l(document).on("click", "#js-link-raw a,#js-link-hd", function(e) {
                return e.preventDefault(),
                e.stopPropagation(),
                window.open(m.photos[m.index].raw),
                u.stat.pingpv("lookRawPic"),
                !1
            }),
            l(window).on("unload.photov7-viewer", function() {
                r.browser.webkit && r.peerjs && !r.peerjs.destroyed && r.peerjs.dispose()
            }),
            this.cmtreplyInit())
        },
        initBodyStyle: function() {
            var t, e = ((window.navigator || {}).userAgent || "").match(/QQ\/(\d+).(\d+)/) || [];
            try {
                t = e[1] !== s && e[2] != s && (8 <= parseInt(e[1]) && 8 <= parseInt(e[2]))
            } catch (e) {
                t = !1
            }
            t && l(document.body).addClass("qq-features")
        },
        initLayer: function(e) {
            var t = this.__scrollTop = l(window).scrollTop()
              , i = l("html").hasClass("os_mac");
            l("html").css({
                "overflow-y": "hidden"
            }),
            l("body").css({
                "overflow-y": "hidden"
            }),
            ua && ua.firefox && ua.firefox < 20 && l("html").css({
                "margin-top": 0 - t
            }),
            ua && ua.chrome && 28 < ua.chrome && window.scrollTo(0, window.scrollY + 1),
            i || (l("html").css({
                "padding-right": "17px"
            }),
            l("#QZ_Toolbar_Container").css({
                "margin-right": "17px"
            }).fadeOut()),
            l("#js-viewer-container").size() ? l("#js-viewer-container").show() : (i = d.page(e),
            (e.div ? l(e.div) : l("body")).append(i)),
            "video" == e.type || "videoandrec" == e.type ? (l("#js-viewer-container").addClass("video-popup"),
            l("#js-viewer-imgWraper").addClass("video-popup-player"),
            l("#js-thumb-ctn").removeClass("photo_minimap_v2").addClass("video-popup-recommend")) : (l("#js-viewer-container").removeClass("video-popup"),
            l("#js-viewer-imgWraper").removeClass("video-popup-player"),
            l("#js-thumb-ctn").removeClass("video-popup-recommend").addClass("photo_minimap_v2")),
            m.config.thumbNail.areaTitle ? l("#js-thumb-ctn h4").text(m.config.thumbNail.areaTitle).show() : l("#js-thumb-ctn h4").text("").hide(),
            l("#js-thumbList-stage").css("margin", "0 " + m.config.thumbNail.arrowWidth + "px"),
            l("#js-thumbList-ctn").height(m.config.thumbNail.imgHeight),
            l("#js-viewer-layer").height(l(window).height()),
            ua.ie && ua.ie <= 6 ? l("#js-viewer-container").css({
                position: "absolute",
                top: t
            }) : l("#js-viewer-container").css({
                position: "fixed",
                top: 0
            }),
            (window.inqq || e.inqq) && (l("#js-figure-area .js-large-mode").hide(),
            l("#js-viewer-container").addClass("mod-client"),
            l("html").height("100%"),
            l("body").height("100%"))
        },
        initStyle: function() {
            l("#viewerStyle").size() || l("head").append(d.style()),
            l("#js-thumb-ctn").css("opacity", 0)
        },
        initConfig: function(e) {
            e.type ? (m.config = l.extend(h[e.appid + "-" + e.type], e),
            m.config.appid = e.appid) : m.config = l.extend(h[e.appid], e),
            m.util = u
        },
        initPeerAcc: function() {
            r.browser.webkit && !r.peerjs && QZONE.FP.getQzoneConfig().ownerUin % 10 == 0 && require.async("photo.v7/lib/peerjs/instance", function(e) {
                u.stat.pingpv("PeerAcc.init"),
                (r.peerjs = e).init("qzone.viewer")
            })
        },
        beforeClose: function() {
            p.trigger("beforeClose")
        },
        close: function(e) {
            if (!u.getParameter("inqq") || !0 === m.option.forceShowCloseBtn) {
                if ((e = e || {}).noTriggerBeforeClose || p.trigger("beforeClose"),
                m && m.option && 1 == m.option.ischild)
                    return m._showMainArea(),
                    top.jQuery(top.window).trigger("resize"),
                    void top.jQuery(".js-slide-iframe").remove();
                l(".js-slide-iframe").remove(),
                m._showMainArea(),
                "video" != m.option.type && "videoandrec" != m.option.type || !m.needResumeMusic || (m.needResumeMusic = !1,
                QZONE.music.playMusic()),
                l("#markContainer").hide(),
                l(".js-can-comment").css("display", "block"),
                l("#js-comment-module").find(".mod_comment_auto_open").css("display", "none").first().css("display", "block"),
                l("#j-comment-tab").css("display", "none").find("a").removeClass("tab-selected").first().addClass("tab-selected"),
                l("html").css({
                    "overflow-y": "",
                    "margin-top": 0,
                    "padding-right": 0
                }),
                l("body").css({
                    "overflow-y": ""
                }),
                l(window).scrollTop(this.__scrollTop),
                l("#QZ_Toolbar_Container").css({
                    "margin-right": "0"
                }).fadeIn(),
                l("#js-viewer-container").hide(),
                p.trigger("close"),
                p.hideFigureArea = !1,
                m._isGettingPhotoList = s,
                m._picKeyChanged = s;
                try {
                    this.option.onClose && this.option.onClose(m),
                    ua && ua.chrome && 28 < ua.chrome && window.scrollTo(0, window.scrollY - 1)
                } catch (e) {}
            }
        },
        reload: function(e, t) {
            "shuoshuo" == e ? m.option.appid = 311 : "photo" == e && (m.option.appid = 4,
            m.topic = {
                bitmap: t.bitmap || "10000000",
                desc: t.desc,
                descType: t.desctype,
                index: "0",
                loginName: "",
                ownerName: t.ownerName,
                ownerUin: t.ownerUin,
                priv: 1,
                pypriv: 1,
                topicId: t.topicId,
                topicName: t.topicName
            }),
            m.initConfig(m.option),
            m.comment.dispose();
            var i = m._plugins;
            if (i && i.length)
                for (var o in i)
                    i[o].dispose && i[o].dispose();
            m._plugins = null,
            m.initPlugins()
        },
        initComponent: function() {
            this.thumbNail = n,
            this.infoArea = a,
            this.like = c,
            this.viewer = o,
            this.components.push(n, o, a, c);
            for (var e = 0, t = this.components.length; e < t; e++)
                this.components[e].init();
            var i = this;
            seajs.use("photo.v7/common/viewer2/comment", function(e) {
                e.init(),
                i.comment = e,
                i.showSideBarButtons()
            })
        },
        initPlugins: function() {
            var e = m.config.plugins;
            if (e) {
                m._plugins = [];
                for (var t = 0, i = e.length; t < i; t++) {
                    var o = e[t]
                      , n = o.enable;
                    "function" == typeof n ? n = n(m.option) : n === s && (n = !0),
                    n && require.async(o.uri, function(e) {
                        m._plugins.push(e),
                        e.init()
                    })
                }
            }
        },
        run: function() {
            if ("907" == m.config.appid || 1 == m.config.favMode)
                return this.openFavMode(this.option),
                void this.initPlugins();
            if (m.option.type && ("comment" == m.option.type || "reply" == m.option.type)) {
                var e = m.option.data;
                if (e && e.photos && e.photos.length)
                    return this.openFavMode(this.option),
                    void this.initPlugins();
                this.thumbNail = n,
                this.infoArea = a,
                this.viewer = o,
                n.init(),
                o.init(),
                a.init(),
                this.initPlugins(),
                l("#js-like-list").hide();
                var t = this;
                return seajs.use("photo.v7/common/viewer2/comment", function(e) {
                    e.init(),
                    t.comment = e
                }),
                void this.getPhotoList({
                    first: !0
                })
            }
            "video" != m.option.type && "videoandrec" != m.option.type || m.setMode("full"),
            this.initComponent(),
            this.getPhotoList({
                first: !0
            }),
            "4" != m.config.appid && this.getcmtreply(),
            this.initPlugins()
        },
        cmtreplyInit: function() {
            l("#j-comment-tab").on("click", function(e) {
                var t, i, o = l(e.target).attr("data-type"), n = l("#js-comment-module").find(".mod_comment_auto_open");
                if ("friend" === o || "cmtreply" === o) {
                    for (var s = 0; s < n.length; s++)
                        "cmtreply_list" === l(n[s]).attr("data-type") ? i = n[s] : t = n[s];
                    "friend" === o ? (l(t).css("display", "block"),
                    l(i).css("display", "none"),
                    l(".js-can-comment").css("display", "block")) : "cmtreply" === o && (l(t).css("display", "none"),
                    l(i).css("display", "block"),
                    l(".js-can-comment").css("display", "none")),
                    l("#j-comment-tab").find("a").removeClass("tab-selected"),
                    l(e.target).addClass("tab-selected")
                }
            })
        },
        getcmtreply: function(e) {
            var r = this
              , t = m.config
              , t = {
                topicId: this.option.topicId,
                picKey: this.getPicKey && this.getPicKey() || this.option.picKey,
                t1_source: "1",
                attach_info: (new Date).getTime(),
                cmtNum: 30,
                uin: this.option.ownerUin,
                appid: t.appid,
                start: 0,
                num: 30,
                hostUin: QZONE.FP.getQzoneConfig().loginUin,
                need_private_comment: 0,
                is_essence_comment: 1
            };
            i.getcmtreply({
                data: t
            }).done(function(e) {
                if (e.comments) {
                    _ = e.comments,
                    g = e.total,
                    v = 1,
                    window.hasCmtreply = !0,
                    f = e.essence_attach_info,
                    l("#j-comment-tab").css("display", "block");
                    for (var t = d.cmtreply({
                        comments: e.comments,
                        total: e.total
                    }), i = l("#js-comment-module").find(".mod_comment_auto_open"), o = 0; o < i.length; o++)
                        "cmtreply_list" === l(i[o]).attr("data-type") && l(i[o]).remove();
                    l("#js-comment-module").append(t),
                    window.hasUserReplay || (l("#j-comment-tab").find("a").eq(0).removeClass("tab-selected"),
                    l("#j-comment-tab").find("a").eq(1).addClass("tab-selected"),
                    l("#js-comment-module").find(".mod_comment_auto_open").eq(0).css("display", "none"),
                    l("#js-comment-module").find(".mod_comment_auto_open").eq(1).css("display", "block"),
                    l(".js-can-comment").css("display", "none"))
                }
                var n, s;
                function a(e) {
                    var t = Math.floor(_.length / 10) + 1
                      , i = 0
                      , o = 0
                      , o = t <= e ? (i = 10 * ((e = t) - 1),
                    _.length - 1) : (i = 10 * (e - 1),
                    10 * e - 1)
                      , o = _.slice(i, o + 1);
                    return d.cmtreplyList({
                        comments: o
                    })
                }
                "1" == e.IsBrand && (window.viewer_IsBrand = !0,
                n = [1, 1, 1, 0, 1],
                s = setInterval(function() {
                    var e = l(".js-can-comment .mod-insert-img")
                      , t = l(".js-can-comment .mod-quick-comment")
                      , i = l(".js-can-comment .js-private-comment")
                      , o = l(".js-can-comment .qz-poster-attach-side");
                    0 < e.length && n[0] && (e.css("display", "none"),
                    n[0] = 0,
                    n[3]++),
                    0 < t.length && n[1] && (t.css("display", "none"),
                    n[1] = 0,
                    n[3]++),
                    0 < i.length && n[2] && (i.css("display", "none"),
                    n[2] = 0,
                    n[3]++),
                    0 < o.length && n[4] && (o.css("display", "none"),
                    n[4] = 0,
                    n[3]++),
                    4 === n[3] && clearInterval(s)
                }, 500)),
                setTimeout(function() {
                    l(".j-comments-list-more").find("a").on("click", function() {
                        r.getcmtreplyList(function() {
                            l(".j-comments-list-more").css("display", "none"),
                            l("#j-page-index-wrap").css("display", "inline");
                            var e = a(v);
                            l("#j-cmtreply-list").html("").append(e)
                        })
                    }),
                    l(".j-page-index").on("click", function() {
                        var e, t = l(this).attr("data-type"), i = l(this).attr("data-index"), o = Math.floor(_.length / 10) + 1;
                        return t ? "1" == t ? 1 < v && (e = a(--v),
                        l("#j-cmtreply-list").html("").append(e),
                        l(".j-page-num").eq(v - 1).removeClass("c_tx").addClass("current").removeAttr("href"),
                        l(".j-page-num").eq(v).removeClass("current").addClass("c_tx").attr("href", "javascript:;"),
                        1 === v && l(".j-page-button").eq(0).removeClass("c_tx").addClass("c_tx3").removeAttr("href"),
                        l(".j-page-button").eq(1).removeClass("c_tx3").addClass("c_tx").attr("href", "javascript:;")) : "2" == t && v < o && (e = a(++v),
                        l("#j-cmtreply-list").html("").append(e),
                        l(".j-page-num").eq(v - 1).removeClass("c_tx").addClass("current").removeAttr("href"),
                        l(".j-page-num").eq(v - 2).removeClass("current").addClass("c_tx").attr("href", "javascript:;"),
                        v === o && l(".j-page-button").eq(1).removeClass("c_tx").addClass("c_tx3").removeAttr("href"),
                        l(".j-page-button").eq(0).removeClass("c_tx3").addClass("c_tx").attr("href", "javascript:;")) : i && (i = parseInt(i),
                        t = v,
                        e = a(v = i),
                        l("#j-cmtreply-list").html("").append(e),
                        l(".j-page-index").eq(v).removeClass("c_tx").addClass("current").removeAttr("href"),
                        l(".j-page-index").eq(t).removeClass("current").addClass("c_tx").attr("href", "javascript:;"),
                        1 == i ? l(".j-page-button").eq(0).removeClass("c_tx").addClass("c_tx3").removeAttr("href") : i === o && l(".j-page-button").eq(1).removeClass("c_tx").addClass("c_tx3").removeAttr("href"),
                        1 == t && 1 != i ? l(".j-page-button").eq(0).removeClass("c_tx3").addClass("c_tx").attr("href", "javascript:;") : t == o && i != o && l(".j-page-button").eq(1).removeClass("c_tx3").addClass("c_tx").attr("href", "javascript:;")),
                        !1
                    })
                }, 50)
            })
        },
        getcmtreplyList: function(t) {
            var e = m.config
              , e = {
                topicId: this.option.topicId,
                picKey: this.getPicKey && this.getPicKey() || this.option.picKey,
                t1_source: "1",
                cmtNum: g - 30,
                uin: this.option.ownerUin,
                appid: e.appid,
                start: f,
                num: g - 30,
                hostUin: QZONE.FP.getQzoneConfig().loginUin,
                need_private_comment: 0,
                is_essence_comment: 1
            };
            i.getcmtreply({
                data: e
            }).done(function(e) {
                e && e.comments && (_ = _.concat(e.comments)),
                t()
            })
        },
        getPhotoList: function(d) {
            var e, o, n;
            (d = d || {}).first && (m.dataSucc = !1,
            m.fakeFirstData = m.config.getFakeFirstData && m.config.getFakeFirstData() || null,
            m.fakeFirstData && p.trigger("onShowFakeFirstData", {
                photo: m.fakeFirstData
            })),
            m._isGettingPhotoList || (m._isGettingPhotoList = !0,
            e = m.config,
            o = {
                topicId: this.option.topicId,
                picKey: this.getPicKey && this.getPicKey() || this.option.picKey,
                shootTime: this.option.shootTime || "",
                cmtOrder: 1,
                fupdate: 1,
                plat: "qzone",
                source: "qzone",
                cmtNum: e.comment.coverPageSize || 10,
                likeNum: 5,
                inCharset: "utf-8",
                outCharset: "utf-8",
                callbackFun: "viewer",
                offset: m.offset || 0,
                number: e.number || 40,
                uin: QZONE.FP.getQzoneConfig().loginUin,
                hostUin: QZONE.FP.getQzoneConfig().loginUin,
                appid: e.appid,
                isFirst: d.first ? "1" : "",
                useWebappCgi: this.option.useWebappCgi
            },
            n = d.getPrevPhoto,
            !d.first && m.config.getListAfterFirst && (o.queryList = 1),
            0 < this.option.ownerUin && (o.hostUin = this.option.ownerUin),
            m.config.getExtraPageParam && (o = l.extend(o, m.config.getExtraPageParam(d))),
            m.last && !n || (d.first && !m.last || m.config.getListAfterFirst || 311 != m.config.appid || "iphoto" == m.config.type || "videoandrec" == m.config.type ? (r.loadTimes.beginGetPhotos = +new Date,
            d.first && (r.loadTimes.firstGetPhotos = +new Date),
            u.checkWebpAsync(),
            i.getPhotos({
                first: d.first,
                data: o
            }).done(function(e) {
                var t, i, o, n, s, a = e.photos || [], r = [];
                if (h.limit = e.limit || 0,
                d.first && (m.dataSucc = !0,
                "iphoto" == m.config.type && (m.first = 0,
                m.last = 0),
                !(h.limit < 2 || m.option.type && "video" != m.option.type && "videoandrec" != m.option.type || 4 !== m.option.appid || null !== m.option.from && "newphoto2" !== m.option.from && "friendphotoinqq" !== m.option.from))) {
                    for (t = decodeURIComponent(m.config.picKey),
                    e.first = 1,
                    e.last = 1,
                    m.config.supportPrevFetch = !1,
                    s = 0,
                    n = a.length; s < n; s++)
                        if ((i = a[s]).picKey == t) {
                            o = i.batchId;
                            break
                        }
                    if (o) {
                        for (s = 0,
                        n = a.length; s < n; s++)
                            (i = a[s]).batchId === o && r.push(i);
                        e.photos = r
                    }
                }
            }).done(function(e) {
                if (r.loadTimes.endGetPhotos = +new Date,
                d.first && (r.loadTimes.firstEndGetPhotos = +new Date),
                "iphoto" == m.config.type) {
                    if (!e.photos || 0 == e.photos.length)
                        return e.last && (m.last = 1),
                        e.first ? m.first = 1 : m.first || (m.first = 0),
                        e.first && e.last ? void QZONE.FP.showMsgbox("没有拉到照片哦", 3, 2e3) : e.first ? void QZONE.FP.showMsgbox("此照片已经是第一张哦", 3, 2e3) : void (e.last && QZONE.FP.showMsgbox("此照片已经是最后一张哦", 3, 2e3));
                    e.first && (m.first = 1)
                } else
                    "videoandrec" == m.config.type && e.first && (m.first = 1);
                var t, i;
                e.last && (m.last = 1),
                e.photos && e.photos.length ? (u.fixImgUrlParams(e.photos),
                t = 1 == n ? 0 : m.photos.length,
                m.photos = n ? e.photos.concat(m.photos) : m.photos.concat(e.photos),
                m.offset = m.config.updateOffset(d),
                d.first ? (m.single = e.single,
                m.topic = e.topic,
                m.isFriend = e.isfriend,
                m.fixPhotoIndex(),
                m.single && (m.photos[m.index].comments = m.single.comments,
                0 === m.photos[m.index].cmtTotal && m.single.comments && (m.photos[m.index].cmtTotal = m.single.comments.length)),
                m.picTotal = e.picTotal,
                "iphoto" == m.config.type && (m.picTotal = 99999),
                m.picPosInTotal = e.picPosInTotal,
                0 < m.photos[m.index].cmtTotal ? window.hasUserReplay = !0 : (window.hasUserReplay = !1,
                window.hasCmtreply && (l("#j-comment-tab").find("a").eq(0).removeClass("tab-selected"),
                l("#j-comment-tab").find("a").eq(1).addClass("tab-selected"),
                l("#js-comment-module").find(".mod_comment_auto_open").eq(0).css("display", "none"),
                l("#js-comment-module").find(".mod_comment_auto_open").eq(1).css("display", "block"),
                l(".js-can-comment").css("display", "none")))) : m.fixPhotoIndex({
                    first: !1
                }),
                p.trigger("onGetPhotos", {
                    data: e,
                    startIndex: t,
                    first: d.first,
                    getPrevPhoto: n,
                    param: o
                }),
                d.first && (e && e.photos && e.photos[m.index] && e.photos[m.index].url && 311 == m.config.appid && (i = e.photos[m.index].url),
                t = u.album.getImgUrl(m.config.pre, "b"),
                e && e.photos && e.photos[m.index] && e.photos[m.index].url && t != e.photos[m.index].url && (m.photos[m.index].downloadUrl = e.photos[m.index].url),
                i = i || t,
                "311" == m.config.appid && (l("#js-btn-open-quanren").hide(),
                2 == m.photos[m.index].who || (m.photos[m.index].url = u.album.getImgUrl(m.config.pre, "b") || i)),
                "421" == m.config.appid && ((i = m.topic) && (window.g_group_isManager = !!i.ismanager,
                window.g_group_isCreator = !!i.iscreator),
                window.g_iLoginUin = QZONE && QZONE.FP && QZONE.FP.getQzoneConfig().loginUin),
                p.trigger("go", {
                    photo: m.photos[m.index],
                    first: 1
                }))) : m.last = 1
            }).fail(function(e) {
                "video" !== m.option.type && "videoandrec" !== m.option.type || m.fakeFirstData || r.tooltip.fail(e && e.message || "服务器忙", 5e3),
                m.last = 1,
                p.trigger("onGetPhotosFail", {
                    data: e
                })
            }).always(function() {
                m._isGettingPhotoList = !1
            })) : m._isGettingPhotoList = !1))
        },
        getPicKey: function() {
            var e = m._oriOption.picKey
              , t = m._picKeyMap;
            return t && t[e] ? (m.option.picKey = m.config.picKey = t[e],
            t[e]) : e
        },
        initScroll: function() {
            seajs.use("photo.v7/common/scrollBox/index", function(e) {
                e.get("./scroll")({
                    boxDiv: l(".js-slideview-scrollbox")[0],
                    scrollcont: ".mod_comments",
                    scrollbox: "div.js-scrollbox",
                    scrollbar: "div.js-scrollbar",
                    scrolling: ".js-scrolling",
                    scrollinginner: ".js-scrolling-inner"
                })
            })
        },
        initPanel: function() {
            this.panelState = 0,
            l("#js-sidebar-ctn").off("updateScroll go"),
            l("#js-sidebar-ctn").on("updateScroll go noRcd", function(e) {
                "noRcd" == e.type ? m.panelState = 1 : m.panelState = 2,
                m.updatePanel()
            })
        },
        updatePanel: function() {
            var e = l("#js-cmt-poster-wrapper")
              , t = l("#js-qq-ad")
              , i = l("#js-face-area")
              , o = l("#js-sidebar-ctn")
              , n = 0;
            o.size() && e.size() && (n = o.offset().top + o.height() - e.offset().top - e.height()),
            2 == this.panelState && (i.size() && n > m.config.face.boxHeight ? this.openQRRcd() : this.closeQRRcd()),
            1 == this.panelState ? t.size() && n > m.config.viewer.adBoxHeight ? this.openQQAd() : this.closeQQAd() : 0 == this.panelState && this.closeQQAd()
        },
        openQRRcd: function() {
            p.trigger("updateFaceInfo")
        },
        openQQAd: function() {
            window.inqq || u.getParameter("inqq") || (l("#js-qq-ad").show(),
            this.openQQAd.inited || (this.openQQAd.inited = !0,
            window.inqq || u.getParameter("inqq") ? (require.async(["photo.v7/common/ad/enter", window.location.protocol + "//qzonestyle.gtimg.cn/gdt/display/comm/gdt_corner.js"], function(e, t) {
                try {
                    e ? (e.init({
                        div: l("#js-qq-ad")[0],
                        params: {
                            isFirst: !0
                        }
                    }),
                    e.show(),
                    setTimeout(function() {
                        t.setCornerCSS(),
                        t.setCornerHtml("http://e.qq.com/reg-new", 3, document.getElementById("js-qq-ad"))
                    }),
                    u.stat.pingpv("qq-ad-init.ok")) : u.stat.pingpv("qq-ad-init.error")
                } catch (e) {
                    u.stat.pingpv("qq-ad-init.error")
                }
            }),
            l("#js-qq-ad").on(e.click, function(e) {
                u.stat.pingpv("qq-ad-click")
            })) : (require.async(["photo.v7/common/ad/pc", window.location.protocol + "//qzonestyle.gtimg.cn/gdt/display/comm/gdt_corner.js"], function(e, t) {
                try {
                    e ? (e.init({
                        div: l("#js-qq-ad")[0],
                        params: {
                            isFirst: !0
                        }
                    }),
                    e.show(),
                    setTimeout(function() {
                        t.setCornerCSS(),
                        t.setCornerHtml("http://e.qq.com/reg-new", 3, document.getElementById("js-qq-ad"))
                    }),
                    u.stat.pingpv("pc-ad-init.ok")) : u.stat.pingpv("pc-ad-init.error")
                } catch (e) {
                    u.stat.pingpv("pc-ad-init.error")
                }
            }),
            l("#js-qq-ad").on(e.click, function(e) {
                u.stat.pingpv("pc-ad-click")
            }))))
        },
        closeQQAd: function() {
            l("#js-qq-ad").hide(),
            this.panelState = 0
        },
        closeQRRcd: function() {
            l("#js-face-area").hide(),
            this.panelState = 0
        },
        updateScroll: function() {
            clearTimeout(m._scrollTimer),
            m._scrollTimer = setTimeout(function() {
                l("#js-viewer-scrollcont").trigger("updateScroll"),
                l("#js-sidebar-ctn").trigger("updateScroll")
            }, 100)
        },
        hideScroll: function() {
            this.wrapper.find(".js-scrollbar").hide()
        },
        fixPhotoIndex: function(e) {
            var t = decodeURIComponent(m.config.picKey);
            e = e || {};
            for (var i = 0, o = m.photos.length; i < o; i++) {
                var n = m.photos[i];
                (n.picKey && escHTML && escHTML(n.picKey) || "") == t && !1 !== e.first || "comment" == m.option.type && n.picKey.replace(/\/[abm]\//g, "//").replace(/http:\/\/[^\/]+/, "").replace("&t=5", "").replace("?t=5", "").replace(/&rf=[^&]+/, "").replace(/&bo=[^&]+/, "") == m.config.pre.replace(/\/[abm]\//g, "//").replace(/http:\/\/[^\/]+/, "").replace("&t=5", "").replace("?t=5", "").replace(/&rf=[^&]+/, "").replace(/&bo=[^&]+/, "") ? (m.index = i,
                m._firstPhotoIndex = i) : n.picKey == t && (m._firstPhotoIndex = i),
                n.url = n.url && u.filterUrlProtocol(n.url),
                n.pre = u.filterUrlProtocol(n.pre),
                n.topicId = n.topicId && escHTML && escHTML(n.topicId) || "",
                n.picKey = n.picKey && escHTML && escHTML(n.picKey) || ""
            }
        },
        isOpen: function() {
            return this.wrapper.is(":visible")
        },
        getMode: function() {
            var e = m && m.option && 1 == m.option.ischild;
            return QZONE.FP._t.QZONE.FP.noShareDb.get(e ? "childslide-mode" : "slide-mode") || "normal"
        },
        setMode: function(e) {
            m._lastmode = m.getMode();
            var t = m && m.option && 1 == m.option.ischild;
            QZONE.FP._t.QZONE.FP.noShareDb.set(t ? "childslide-mode" : "slide-mode", e)
        },
        setLastMode: function(e) {
            var t = m._lastmode;
            !t || t == m.getMode() && "hd" == t ? m.setMode("normal") : m.setMode(m._lastmode)
        },
        showSingleImg: function(e) {
            p.stopGo = !0,
            m.singleImg = !0,
            m.fakeFirstData || (l("#js-viewer-main").width(l("#js-viewer-imgWraper").width() + 20),
            this.sideBarCtn.hide()),
            e && e.hideThumbs && l("#js-thumb-ctn").hide(),
            e && e.hideFigureArea && (p.hideFigureArea = !0,
            l("#js-figure-area").hide())
        },
        showSideBarButtons: function() {
            m.like && m.like.likeBtn && (m.like.likeBtn.show(),
            l(".js-info-separator").show()),
            m.comment.cmtBtn.show()
        },
        openChildSlide: function(e) {
            var t = l(".js-slide-iframe");
            if (!t.length) {
                l("body").append('<iframe class="js-slide-iframe" style="display:none" />');
                var i = (t = l(".js-slide-iframe"))[0].contentWindow;
                try {
                    i.g_StyleID = top.window.g_StyleID,
                    i.$j = i.jQuery
                } catch (e) {}
            }
            var o = "";
            for (key in e)
                o += key + "=" + encodeURIComponent(e[key]) + "&";
            var n = "http://qzs.qq.com/qzone/photo/v7/page/photo.html?init=photo.v7/common/viewer2/index&" + (o += "useqzfl=1&useinterface=1&ischild=1");
            n += "&uin=" + e.ownerUin;
            var s = l("#js-viewer-container");
            l("#js-viewer-main");
            t.attr("src", n).css({
                top: "fixed" == s.css("position") ? 0 : s.offset().top,
                left: s.offset().left,
                position: s.css("position"),
                width: l(window).width(),
                height: l(window).height(),
                zIndex: parseInt(s.css("z-index")) + 1
            }).show(),
            m._hideMainArea()
        },
        _hideMainArea: function() {
            top.jQuery("#js-viewer-figure").hide(),
            top.jQuery("#js-thumb-ctn").hide()
        },
        _showMainArea: function() {
            top.jQuery("#js-viewer-figure").show(),
            top.jQuery("#js-thumb-ctn").show()
        },
        openFavMode: function(e) {
            this.sideBarCtn.hide(),
            m.config.favMode = !0,
            m.config.sideBar.width = 0;
            var t, i = e.data;
            try {
                "string" == typeof i && (i = JSON.parse(decodeURIComponent(i)))
            } catch (e) {}
            (i && i.photos && 0 != i.photos.length || 907 != m.config.appid) && (i && i.photos && 0 != i.photos.length || "comment" != m.option.type && "reply" != m.option.type || (m.singleImg = !0,
            i = {
                photos: [{
                    picKey: e.pre,
                    pre: e.pre,
                    url: u.album.getImgUrl(e.pre, "b")
                }]
            }),
            m.setMode("normal"),
            m.photos = i.photos,
            this.viewer = o,
            this.thumbNail = n,
            this.viewer.init(),
            this.thumbNail.init(),
            (t = l("#js-figure-area")).find(".js-normal-mode").hide(),
            t.find(".js-large-mode").hide(),
            t.find(".js-hd-mode").hide(),
            p.trigger("onGetPhotos", {
                data: i,
                startIndex: 0,
                first: e.first
            }),
            m.fixPhotoIndex(),
            p.trigger("go", {
                photo: m.photos[m.index]
            }))
        },
        _playCurrVideo: function() {}
    }),
    m
}),
define.pack("./thumbNail", ["photo.v7/lib/jquery", "photo.v7/lib/photo", "./event", "./tmpl", "./util", "./config"], function(require, exports, module) {
    var l = require("photo.v7/lib/jquery")
      , n = require("photo.v7/lib/photo")
      , a = require("./event")
      , r = require("./tmpl")
      , p = require("./util")
      , s = require("./config")
      , e = p.evt
      , i = {};
    return l.extend(i, {
        init: function() {
            this.alive = !0,
            this.wrapper = l("#js-thumb-ctn"),
            this.listWrapper = this.wrapper.find("#js-thumbList-ctn"),
            this.stage = this.wrapper.find("#js-thumbList-stage"),
            this.prevBtn = this.wrapper.find("#js-thumb-prev"),
            this.nextBtn = this.wrapper.find("#js-thumb-next"),
            this.unexpandBtn = this.wrapper.find("#js-thumb-unexpand"),
            this.expandBtn = this.wrapper.find("#js-thumb-expand"),
            this.startIndex = 0,
            this.defaultPageSize = slide.config.thumbNail.pageSize || 19,
            this.pageSize = this.defaultPageSize,
            this.visibleStart = 0,
            this.visibleNum = 0,
            this.autoGetPhotosCount = 0,
            QZONE.FP.isAlphaUser(!0) && slide.config.useFullScreenMode && l("#js-ctn-switch").hide(),
            this.bind()
        },
        bind: function() {
            var d;
            this._hasBindEvent || (this._hasBindEvent = !0,
            d = this,
            a.bind("onGetPhotos", function(e, t) {
                var i;
                d.alive && (i = t.data.photos,
                d.render({
                    photos: i,
                    startIndex: t.startIndex,
                    getPrevPhoto: t.getPrevPhoto
                }),
                "videoandrec" == slide.option.type && setTimeout(function() {
                    var e;
                    d.autoGetPhotosCount++,
                    3 < d.autoGetPhotosCount || (e = d.wrapper.find('li.js-thumb-item[data-index="' + (slide.photos.length - 1) + '"]').offset(),
                    !slide.last && e && e.left < d.wrapper.width() - slide.config.thumbNail.arrowWidth && !slide.config.favMode && (window.console && window.console.log("onGetPhotos: getPhotoList"),
                    slide.getPhotoList()))
                }, 10))
            }),
            a.bind("go", function(e, t) {
                var i, o, n, s, a = t.photo;
                if (d.wrapper.find("li.js-thumb-item").each(function() {
                    var e = l(this);
                    return e.attr("data-picKey") === a.picKey || escHTML(e.attr("data-picKey")) === a.picKey ? (i = e,
                    !1) : void 0
                }),
                o = parseInt(i && i.attr("data-index")) || 0,
                l("li.js-thumb-item").removeClass(slide.config.thumbNail.selectClass),
                slide.config.thumbNail.hoverClass && l("li.js-thumb-item").removeClass(slide.config.thumbNail.hoverClass),
                i && i.addClass(slide.config.thumbNail.selectClass),
                slide.config.supportPrevFetch && (n = i.index(),
                s = d.wrapper.find("li.js-thumb-item")[0],
                l(s).attr("data-total-index", slide.picPosInTotal - n)),
                "comment" == slide.option.type ? d.hideCmtNum() : d.showCmtNum({
                    photo: a
                }),
                o == slide.photos.length - 1 && !slide.last && 907 != slide.config.appid && "comment" != slide.option.type)
                    return window.console && window.console.log("lastItem: getPhotoList"),
                    slide.getPhotoList(),
                    void ("iphoto" == slide.config.type && t.first && Math.ceil(d.pageSize / 2) < slide.photos.length && d.next({
                        num: o
                    }));
                d.preloadImg();
                try {
                    var r = d.checkIsFirstOrLast({
                        photo: a,
                        pitem: i,
                        index: o
                    })
                } catch (e) {
                    r = {}
                }
                r.first && d.prev(),
                r.last && ("iphoto" == slide.config.type && t.first ? d.next({
                    num: o
                }) : d.next())
            }),
            a.bind("liveTypeChanged", function(e, t) {
                var i = parseInt(t && t.index);
                if (!isNaN(i)) {
                    t = slide.photos[i];
                    if (t && t.videoExtend) {
                        var i = d.wrapper.find('li.js-thumb-item[data-index="' + i + '"]')
                          , o = ""
                          , n = ""
                          , s = "正在播放...";
                        if (5 == t.videoType) {
                            switch (t.videoExtend.type) {
                            case 1:
                                o = "live",
                                n = "LIVE",
                                s = "正在直播";
                                break;
                            case 2:
                                o = "replay",
                                n = "REPLAY",
                                s = "正在播放...";
                                break;
                            case 3:
                                o = "done",
                                n = "END",
                                s = "直播已结束";
                                break;
                            case 4:
                                o = "replay",
                                n = "REPLAY",
                                s = "正在生成回放";
                                break;
                            default:
                                o = "done",
                                n = "END",
                                s = "无法观看"
                            }
                            i.find(".js-thumbNail-playing-text").text(s),
                            i.find(".js-thumbNail-live-icon").removeClass("live replay done").addClass(o),
                            i.find(".js-thumbNail-live-icon-text").text(n)
                        }
                    }
                }
            }),
            a.bind("close", function() {
                d.dispose()
            }),
            this.wrapper.delegate("li.js-thumb-item", e.click, function() {
                var e, t = parseInt(l(this).attr("data-index"));
                t != slide.index && (p.stat.pingpv("clickThumb", t),
                a.stopGo = !1,
                slide.index = t,
                "iphoto" == slide.config.type && (e = slide.photos[t],
                slide.reload(e.ugcType, e)),
                slide.closeQRRcd(),
                slide.closeQQAd(),
                a.trigger("go", {
                    index: t,
                    photo: slide.photos[t]
                }))
            }),
            this.wrapper.delegate("li.js-thumb-item", "exposure", function() {
                var e = parseInt(l(this).attr("data-index"));
                i.stopExpoTimer(e, !0)
            }),
            this.wrapper.delegate("li.js-thumb-item", e.mouseenter, function() {
                var e = l(this)
                  , t = parseInt(e.attr("data-index"));
                slide.index != t && slide.config.thumbNail.hoverClass && (e.addClass(slide.config.thumbNail.hoverClass),
                l(this).find(".mask").remove())
            }),
            this.wrapper.delegate("li.js-thumb-item", e.mouseleave, function() {
                var e = l(this)
                  , t = parseInt(e.attr("data-index"));
                slide.index != t && slide.config.thumbNail.hoverClass && (e.removeClass(slide.config.thumbNail.hoverClass),
                l(this).append('<span class="mask"></span>'))
            }),
            this.wrapper.delegate("#js-thumb-prev", e.click, function() {
                var e;
                this.disableBtn || this.disablePrevBtn || (p.stat.pingpv("clickPrevPage"),
                e = Math.ceil(d.pageSize / 2),
                d.prev({
                    num: e
                }))
            }),
            this.wrapper.delegate("#js-thumb-next", e.click, function() {
                var e;
                this.disableBtn || this.disableNextBtn || (p.stat.pingpv("clickNextPage"),
                e = Math.ceil(d.pageSize / 2),
                d.next({
                    num: e
                }))
            }),
            l("#js-ctn-switch").delegate("#js-thumb-unexpand", e.click, function(e) {
                slide.setMode("full"),
                a.trigger("enterFullScreenMode")
            }),
            l("#js-ctn-switch").delegate("#js-thumb-expand", e.click, function(e) {
                slide.setMode("normal"),
                l("#js-btn-changeMode").hasClass("js-show-origin") && l("#js-btn-changeMode").removeClass("js-show-origin").addClass("js-show-normal"),
                a.trigger("quitFullScreenMode")
            }),
            a.bind("first2last", function(e, t) {
                var i, o = t.total, n = d.pageSize, t = d.wrapper.find(".js-thumb-item")[0], t = l(t).attr("data-total-index");
                slide && slide.picTotal && 0 < slide.picTotal - o && slide.config.supportPrevFetch && 1 < t && "iphoto" != slide.config.type || !("iphoto" != slide.config.type || 0 == slide.index && slide.first) ? (i = (i = slide.picTotal - o) > d.pageSize ? d.pageSize : i,
                d.prev({
                    num: i,
                    getPrevPhoto: !0
                })) : slide.picPosInTotal + slide.index - slide._firstPhotoIndex == 0 || (311 == slide.config.appid || "iphoto" == slide.config.type && slide.first) && 0 == slide.index ? "video" == slide.option.type || "videoandrec" == slide.option.type ? QZONE.FP.showMsgbox("此视频已经是第一个哦", 3, 2e3) : QZONE.FP.showMsgbox("此照片已经是第一张哦", 3, 2e3) : o <= n || (i = 19 == d.pageSize ? 8 * parseInt(o / 8) : o - n / 2,
                d.next({
                    num: i
                }))
            }),
            a.bind("last2first", function() {
                slide.photos.length <= d.pageSize || slide.picPosInTotal + slide.index - slide._firstPhotoIndex != slide.photos.length && (d.disableBtn = !0,
                d.listWrapper.animate({
                    marginLeft: 0
                }, 350, function() {
                    d.disableBtn = !1,
                    d.showPageBtn()
                }))
            }),
            a.bind("beforeGo", function(e, t) {
                var i = slide.photos.length
                  , o = slide.index;
                311 == slide.config.appid && 1 < i && i - 1 <= o && ("right" === t.direction ? (a.stopGo = !0,
                "video" == slide.option.type || "videoandrec" == slide.option.type ? QZONE.FP.showMsgbox("此视频已经是最后一个哦", 3, 2e3) : QZONE.FP.showMsgbox("此照片已经是最后一张哦", 3, 2e3)) : a.stopGo = !1)
            }),
            a.bind("resizeThumbnails", function(e, t) {
                setTimeout(function() {
                    d.adjustWidth(slide.photos);
                    var e = l("#js-thumb-subctn");
                    "full" == slide.getMode() ? e.css("marginLeft", (slide.wrapper.width() - e.width()) / 2) : e.css("marginLeft", (slide.viewer.imgWrapper.width() + 20 - e.width()) / 2),
                    d.checkExposure()
                }, 0)
            }))
        },
        preloadImg: function(e) {
            var t, i, o;
            0 < s.limit || (e = e || 0,
            t = slide.photos[slide.index],
            i = slide.photos[e || slide.index + 1],
            (o = slide.config.stat.preloadSpeed) && n.oz.speedSetBase(o, +new Date),
            i && i.url && t.batchId && i.batchId && t.batchId == i.batchId && p.imgLoad(i.url, function() {
                var e;
                o && (e = (new Date).getTime(),
                n.oz.speedSet(o + "-1", e),
                i.isWebp ? n.oz.speedSet(o + "-3", e) : n.oz.speedSet(o + "-2", e),
                (slide.util.getParameter("inqq") || window.inqq) && n.oz.speedSet(o + "-4", e),
                n.oz.speedSend(o, {
                    sampling: 10,
                    reportSampling: !1
                }))
            }),
            i && i.url && 311 == slide.config.appid && p.imgLoad(i.url, function() {
                var e;
                o && (e = (new Date).getTime(),
                n.oz.speedSet(o + "-1", e),
                i.isWebp ? n.oz.speedSet(o + "-3", e) : n.oz.speedSet(o + "-2", e),
                (slide.util.getParameter("inqq") || window.inqq) && n.oz.speedSet(o + "-4", e),
                n.oz.speedSend(o, {
                    sampling: 10,
                    reportSampling: !1
                }))
            }),
            i && i.origin && (QZONE.FP.isAlphaUser(!0) || QZONE.FP.getVipStatus(!0)) && ("full" == slide.getMode() || "hd" == slide.getMode()) && p.imgLoad(i.origin, function() {
                var e;
                o && (e = (new Date).getTime(),
                n.oz.speedSet(o + "-5", e),
                i.isWebp ? n.oz.speedSet(o + "-7", e) : n.oz.speedSet(o + "-6", e),
                (slide.util.getParameter("inqq") || window.inqq) && n.oz.speedSet(o + "-8", e),
                n.oz.speedSend(o, {
                    sampling: 10,
                    reportSampling: !1
                }))
            }))
        },
        hideCmtNum: function() {
            l("#js-thumbList-ctn .js-thumb-cmtcount").hide()
        },
        showCmtNum: function(e) {
            var t, i = e.photo, o = l(".js-thumb-item"), e = i.cmtTotal;
            if (o.each(function() {
                var e = l(this);
                return e.attr("data-picKey") === i.picKey || escHTML(e.attr("data-picKey")) === i.picKey ? (t = e,
                !1) : void 0
            }),
            !t)
                return !1;
            t.find(".js-thumb-cmtcount a").text(e),
            0 < e && !slide.config.thumbNail.hideCmt && "comment" !== slide.option.type && !i.is_weixin_mode ? t.find(".js-thumb-cmtcount").fadeIn() : t.find(".js-thumb-cmtcount").hide()
        },
        render: function(e) {
            var t = this;
            if (e.getPrevPhoto) {
                var i = r.thumbNail({
                    thumbCfg: slide.config.thumbNail,
                    util: p,
                    type: slide.option.type,
                    photos: e.photos,
                    startIndex: e.startIndex
                });
                this.listWrapper.prepend(i);
                for (var o = this.listWrapper.find(".js-thumb-item"), n = o.length - 1; 0 < n; n--) {
                    var s = l(o[n]);
                    if (s.attr("data-total-index") && s.removeAttr("data-total-index"),
                    s.data("index") == n) {
                        0;
                        break
                    }
                    s.attr("data-index", n),
                    s.attr("id", "_slideView_minimapimg_li_" + n)
                }
                slide.index = n,
                a.trigger("go", {
                    index: n,
                    photo: slide.photos[n]
                })
            } else
                this.listWrapper.append(r.thumbNail({
                    thumbCfg: slide.config.thumbNail,
                    util: p,
                    type: slide.option.type,
                    photos: e.photos,
                    startIndex: e.startIndex
                }));
            this.adjustWidth(e.photos),
            this.showPageBtn(),
            setTimeout(function() {
                t.lazyLoadImg(e.photos),
                t.checkExposure()
            }, 0)
        },
        lazyLoadImg: function(e) {
            var t = this.wrapper.find("li.js-thumb-item")
              , i = this.wrapper.offset()
              , a = this.wrapper.width()
              , r = slide.config.thumbNail;
            t.each(function() {
                var o, n, e, s = l(this), t = s.offset().left;
                if (!(t - i.left < 0 - a)) {
                    if (t - i.left > a + a)
                        return !1;
                    (t = (e = s.find("img.js-thumbNail-img")).attr("data-src")) !== e.attr("src") && (o = t,
                    n = e,
                    p.imgLoad(o, function(e) {
                        "907" == slide.config.appid && s.parent().find(".js-thumb-cmtcount").hide();
                        var t = Math.min(e.width / r.imgWidth, e.height / r.imgHeight)
                          , i = e.width / t
                          , t = e.height / t;
                        n.attr({
                            src: o
                        }),
                        n.css({
                            position: "absolute",
                            width: i,
                            height: t,
                            left: (r.imgWidth - i) / 2,
                            top: .8 * t < r.imgHeight ? (r.imgHeight - t) / 2 : .1 * -t
                        }).show()
                    }))
                }
            })
        },
        adjustWidth: function(e) {
            var t, i = slide.config, o = i.thumbNail, n = o.imgGapWidth, s = o.arrowWidth, a = o.imgWidth, r = (o.imgHeight,
            this.defaultPageSize), d = l(window).width(), o = (i.useFullScreenMode,
            t = "full" == slide.getMode() ? d : slide.viewer.imgWrapper.width());
            p.getParameter("inqq") && (t -= 20),
            r = Math.floor((t - 2 * s) / (n + a)),
            this.pageSize = r,
            i.favMode && (this.pageSize = this.defaultPageSize),
            t = (i = this.pageSize * (n + a)) + 2 * n + 2 * s,
            a = slide.photos.length * (n + a),
            this.stage.width(i),
            "full" == slide.getMode() ? this.wrapper.width(d) : this.wrapper.width(l("#js-viewer-main").width()),
            l("#js-thumb-subctn").width(i + 2 * s),
            this.listWrapper.width(a),
            l("#js-thumb-title").css("padding-left", (o - i) / 2),
            this.lazyLoadImg(null),
            this.checkExposure()
        },
        showPageBtn: function() {
            var e = parseInt(this.listWrapper.css("marginLeft")) || 0
              , t = this.listWrapper.width()
              , i = this.stage.width();
            this.wrapper.width();
            0 <= e || t < i ? (this.prevBtn.css({
                visibility: "hidden"
            }),
            this.disablePrevBtn = !0) : (this.prevBtn.css({
                visibility: ""
            }),
            this.disablePrevBtn = !1),
            t + e < i ? (this.nextBtn.css({
                visibility: "hidden"
            }),
            this.disableNextBtn = !0) : (this.nextBtn.css({
                visibility: ""
            }),
            this.disableNextBtn = !1)
        },
        getVisibleRange: function() {
            var e = slide.config.thumbNail
              , t = e.imgWidth
              , i = e.imgGapWidth
              , o = parseInt(this.listWrapper.css("marginLeft")) || 0
              , n = this.listWrapper.width()
              , s = this.stage.width()
              , e = {};
            return e.start = 0 <= o || n < s ? 0 : -o / (t + i),
            e.num = Math.min(slide.photos.length - e.start, this.pageSize),
            e
        },
        checkExposure: function() {
            if ("video" == slide.option.type || "videoandrec" == slide.option.type) {
                var e = this.getVisibleRange();
                if (e) {
                    for (var t, i, o = e.start, e = e.num, n = o + e, s = 0; s < this.visibleNum; s++)
                        t = this.visibleStart + s,
                        (i = slide.photos[t]) && !i.expoReported && (o <= t && t < n || this.stopExpoTimer(t));
                    this.visibleStart = o,
                    this.visibleNum = e;
                    for (s = 0; s < this.visibleNum; s++)
                        t = this.visibleStart + s,
                        (i = slide.photos[t]) && !i.expoReported && this.startExpoTimer(t)
                }
            }
        },
        startExpoTimer: function(e) {
            var t = slide.photos[e];
            t && !t.expoReported && (t.expoTimer || (t.expoTimer = setTimeout(function() {
                i.stopExpoTimer(e, !0)
            }, 2e3)))
        },
        stopExpoTimer: function(e, t) {
            var i = slide.photos[e];
            i && (i.expoTimer && (clearTimeout(i.expoTimer),
            i.expoTimer = null),
            !i.expoReported && t && (i.expoReported = !0,
            p.stat.reportExposure(i, e)))
        },
        prev: function(e) {
            if (!this.disableBtn && !this.disablePrevBtn) {
                e = e || {};
                var t = this
                  , i = slide.config
                  , o = i.thumbNail
                  , n = o.imgGapWidth
                  , s = (o.arrowWidth,
                o.imgWidth)
                  , o = e.num || Math.ceil(this.pageSize / 2)
                  , n = o * (n + s)
                  , s = parseInt(this.listWrapper.css("marginLeft")) || 0;
                if (e.getPrevPhoto && i.supportPrevFetch)
                    return window.console && window.console.log("prev: getPhotoList"),
                    void slide.getPhotoList({
                        prevNum: o,
                        postNum: 0,
                        getPrevPhoto: !0
                    });
                this.disableBtn = !0,
                this.listWrapper.animate({
                    marginLeft: Math.min(s + n, 0)
                }, 350, function() {
                    t.disableBtn = !1,
                    t.showPageBtn(),
                    t.lazyLoadImg(null),
                    t.checkExposure()
                }),
                p.stat.pingpv("prevPage")
            }
        },
        next: function(e) {
            var t, i, o, n, s;
            this.disableBtn || this.disableNextBtn || (e = e || {},
            t = this,
            i = (s = slide.config.thumbNail).imgGapWidth,
            s.arrowWidth,
            s = s.imgWidth,
            this.listWrapper.width(),
            e = (e.num || Math.ceil(this.pageSize / 2)) * (i + s),
            i = parseInt(this.listWrapper.css("marginLeft")) || 0,
            slide.photos[slide.index],
            o = this.wrapper.find('li.js-thumb-item[data-index="' + (slide.photos.length - 1) + '"]'),
            s = this.nextBtn.offset(),
            this.disableBtn = !0,
            0 < s.left && (this.nextBtnLeft = s.left),
            this.listWrapper.animate({
                marginLeft: i - e
            }, 350, function() {
                t.disableBtn = !1,
                t.showPageBtn(),
                n = o.offset(),
                !slide.last && n.left < t.nextBtnLeft && !slide.config.favMode && (window.console && window.console.log("next: getPhotoList"),
                slide.getPhotoList()),
                t.lazyLoadImg(null),
                t.checkExposure()
            }),
            p.stat.pingpv("nextPage"))
        },
        checkIsFirstOrLast: function(e) {
            var t = slide.photos.length
              , i = e.index
              , o = this.wrapper.find('li.js-thumb-item[data-index="' + (i - 1) + '"]').offset()
              , n = this.prevBtn.offset()
              , s = this.wrapper.find('li.js-thumb-item[data-index="' + (i + 1) + '"]')
              , a = s.offset()
              , r = this.nextBtn.offset()
              , d = !1
              , e = !1;
            return i == t - 1 || 0 == i || (o.left < n.left + this.prevBtn.width() && (d = !0),
            a.left + s.width() > r.left && (e = !0)),
            {
                first: d,
                last: e
            }
        },
        dispose: function() {
            this.alive = !1,
            this.prevBtn.css({
                visibility: "hidden"
            }),
            this.nextBtn.css({
                visibility: "hidden"
            }),
            this.listWrapper.html("").css({
                margin: "0 auto"
            }),
            p.stat.forceReportExposure()
        }
    }),
    i
}),
define.pack("./util", ["photo.v7/lib/jquery", "photo.v7/lib/photo", "./util.stat", "./util.math", "./util.mood", "./util.album", "./util.drag", "./util.evt"], function(require, exports, module) {
    var t = require("photo.v7/lib/jquery")
      , r = require("photo.v7/lib/photo")
      , o = {};
    return t.extend(o, {
        imgLoad: function(e, t) {
            var i = slide.imgCache[e]
              , o = e;
            slide.config.appid;
            if (i)
                return t.call(slide, i);
            var n = r.helper.getImageInfoByUrl(e);
            if (-1 !== e.indexOf("/b/") && 0 < n.bw && 0 < n.bh) {
                i = {
                    url: o,
                    width: n.bw,
                    height: n.bh
                };
                if (2 === n.type)
                    return slide.imgCache[o] = i,
                    t.call(slide, i);
                if (slide.config.enableWebpFlash && slide.config.enableWebpFlash())
                    return slide.imgCache[o] = i,
                    t.call(slide, i)
            }
            var s = new Image;
            s.startLoadTime = (new Date).getTime(),
            s.onload = function() {
                var e = {
                    url: o,
                    width: s.width,
                    height: s.height
                };
                slide.imgCache[o] = e,
                t.call(slide, e),
                s.endLoadTime = (new Date).getTime(),
                -1 !== s.src.indexOf("/b/") && setTimeout(function() {
                    require.async("photo.v7/common/util/monitor/photo", function(e) {
                        e.reportLoadStat({
                            url: s.src,
                            size: s.fileSize || 0,
                            delay: s.endLoadTime - s.startLoadTime,
                            width: s.width,
                            height: s.height,
                            errcode: null
                        }),
                        s = null
                    })
                }, 0)
            }
            ,
            s.onerror = function() {
                s.endLoadTime = (new Date).getTime(),
                setTimeout(function() {
                    require.async("photo.v7/common/util/monitor/photo", function(e) {
                        e.reportLoadStat({
                            url: s.src,
                            size: s.fileSize || 0,
                            delay: s.endLoadTime - s.startLoadTime,
                            width: s.width,
                            height: s.height,
                            errcode: 9999
                        }),
                        s = null
                    })
                }, 0)
            }
            ,
            s.setAttribute("src", o)
        },
        getPureUrl: function(e) {
            if (e)
                return e.indexOf("?rf=") && (e = e.split("?rf=")[0]),
                e.indexOf("&rf=") && (e = e.split("&rf=")[0]),
                e.indexOf("&t=") && (e = e.split("&t=")[0]),
                e
        },
        getParameter: function(e, t) {
            t = t || location.href;
            e = new RegExp("(\\?|#|&)" + e + "=([^&#]*)(&|#|$)"),
            e = t.match(e);
            return e ? e[2] : ""
        },
        fixImgUrlParams: function(e) {
            if (e && e.length)
                for (var t = slide.config.appid || 0, i = 0; i < e.length; i++) {
                    var o = e[i].url
                      , n = e[i].origin
                      , s = o
                      , a = n;
                    o && -1 === o.indexOf("rf=") && (s = o + (-1 < o.indexOf("?") ? "&" : "?") + "rf=viewer_" + t),
                    n && -1 === n.indexOf("rf=") && (a = n + (-1 < n.indexOf("?") ? "&" : "?") + "rf=viewer_" + t),
                    slide.supportWebp && (r.helper.getImageInfoByUrl(s),
                    s && -1 === s.indexOf("t=5") && (s = s + (-1 < s.indexOf("?") ? "&" : "?") + "t=5",
                    n && (a = a + (-1 < a.indexOf("?") ? "&" : "?") + "t=5")),
                    e[i].isWebp = 1),
                    e[i].url = s,
                    e[i].origin = a
                }
        },
        checkWebpAsync: function(t) {
            r && r.support.checkWebpAsync && slide && void 0 === slide.supportWebp && (slide.supportWebp = !1,
            (window.inqq || o.getParameter("inqq")) && (slide.supportWebp = !0),
            "1" == r.cookie("QZ_FE_WEBP_SUPPORT") && (slide.supportWebp = !0),
            r.support.checkWebpAsync(function(e) {
                slide.supportWebp = !!e,
                "function" == typeof t && t(slide.supportWebp)
            }))
        },
        autoScale: function(e) {
            var t = e.maxw
              , i = e.maxh
              , o = e.sw
              , n = e.sh
              , s = o
              , a = n
              , e = 1;
            return t < o && n < i && (a = n * (e = (s = t) / o)),
            t <= o && i <= n && (i / a <= t / o ? s = o * (e = (a = i) / n) : a = n * (e = (s = t) / o)),
            o < t && i < n && (s = o * (e = (a = i) / n)),
            o < t && n < i && (s = o,
            a = n,
            e = 1),
            {
                w: s,
                h: a,
                scale: e
            }
        },
        isHighTime: function() {
            var e = new Date
              , t = new Date(e.getFullYear(),e.getMonth(),e.getDate(),18,0)
              , i = new Date(e.getFullYear(),e.getMonth(),e.getDate(),23,59);
            return t <= e && e <= i
        },
        formatDate: function(e) {
            var t = (e = new Date(e)).getFullYear()
              , i = e.getMonth()
              , e = e.getDate();
            return t + "-" + (i++ < 9 ? "0" + i : i) + "-" + (e < 9 ? "0" + e : e)
        },
        formatTime: function(e) {
            var t = (e = new Date(1e3 * e)).getFullYear()
              , i = e.getMonth()
              , o = e.getDate()
              , n = e.getMinutes()
              , s = e.getHours()
              , e = e.getSeconds();
            return t + "-" + (i++ < 9 ? "0" + i : i) + "-" + (o < 9 ? "0" + o : o) + " " + (s = s < 10 ? "0" + s : s) + ":" + (n = n < 10 ? "0" + n : n) + ":" + (e = e < 10 ? "0" + e : e)
        },
        formatTime2: function(e) {
            if (isNaN(e) || "number" != typeof e || (e = new Date(1e3 * e)),
            !e || "date" != Object.prototype.toString.call(e).slice(8, -1).toLowerCase())
                return "";
            var t = e.getFullYear()
              , i = e.getMonth()
              , o = e.getDate()
              , n = e.getHours()
              , s = (s = e.getMinutes()) < 10 ? "0" + s : s
              , e = new Date
              , s = e.getFullYear() == t ? e.getMonth() == i && e.getDate() == o ? n + ":" + s : i + 1 + "月" + o + "日 " + n + ":" + s : t + "年" + (i + 1) + "月" + o + "日 " + n + ":" + s;
            return s
        },
        formatDuration: function(e) {
            e = Math.floor(e / 1e3) || 0;
            var t = Math.floor(e % 60);
            t < 10 && (t = "0" + t);
            var i = Math.floor(e / 60 % 60);
            i < 10 && (i = "0" + i);
            e = Math.floor(e / 3600);
            return (0 < e ? e + ":" : "") + i + ":" + t
        },
        formatSize: function(e) {
            e /= 1024;
            return 1024 <= e ? (e / 1024).toFixed(2) + "M" : (1 < e ? Math.floor(e) : e.toFixed(2)) + "KB"
        },
        formatNum: function(e) {
            return 1e4 < e ? ((e / 1e4).toFixed(1) + "万").replace(".0", "") : e + ""
        },
        requestFullScreen: function(e, t) {
            e.requestFullScreen ? e.requestFullScreen() : e.webkitRequestFullScreen ? e.webkitRequestFullScreen() : e.mozRequestFullScreen && e.mozRequestFullScreen()
        },
        fullScreenChange: function(e) {
            e && t(document).off("fullscreenchange webkitfullscreenchange mozfullscreenchange").on("fullscreenchange webkitfullscreenchange mozfullscreenchange", e)
        },
        exitFullScreen: function() {
            var e = document;
            e.exitFullScreen ? e.exitFullScreen() : e.webkitCancelFullScreen ? e.webkitCancelFullScreen() : e.mozCancelFullScreen && e.mozCancelFullScreen()
        },
        supportFullScreen: function() {
            var e = document;
            return !(ua && ua.safari || window.inqq || slide.util.getParameter("inqq") || 421 == slide.config.appid || !1 === slide.option.enableFullScreen || "comment" == slide.option.type) && ("fullscreenEnabled"in e || "webkitFullscreenEnabled"in e || "mozFullscreenEnabled"in e || "webkitCancelFullScreen"in e) || !1
        },
        isFullScreenStatus: function() {
            var e = document;
            return e.fullscreen || e.webkitIsFullScreen || e.mozFullScreen || !1
        },
        filterUrlProtocol: function(e) {
            var t = "http://" + (siDomain || "qzonestyle.gtimg.cn") + "/ac/b.gif";
            if (e = e || t,
            r && r.string && r.string.parseUri) {
                var i = r.string.parseUri(e);
                return i && "http" != i.protocol && "https" != i.protocol && (e = t),
                e
            }
            return /^https?:\/\//.test(e) || (e = t),
            e
        },
        isEmptyUrl: function(e) {
            return !e || e == "http://" + (siDomain || "qzonestyle.gtimg.cn") + "/ac/b.gif"
        },
        getNewDate: function(e) {
            return "string" == typeof e ? new Date((e || "").replace(/-/g, "/")) : new Date(e)
        },
        processSingleVideoShuoShuoData: function(e, t, i) {
            var o;
            e && (o = e.url,
            e.videoUrl = o,
            e.url = e.pre,
            e.videoTypeFixed || (e.videoTypeFixed = !0,
            1 == e.videoType ? e.videoType = 2 : e.videoType = 1),
            1 == e.videoType ? e.videoId = e.picKey : 2 == e.videoType && (e.videoId = e.picKey,
            e.videoUrl = "http://imgcache.qq.com/tencentvideo_v1/player/TPQzone.swf?vid=" + e.picKey + "&skin=" + encodeURIComponent("http://imgcache.qq.com/minivideo_v1/vd/res/skins/QzoneMiniSkin.swf"),
            e.width = 660,
            e.height = 495),
            e.videoSource = -1,
            e.videoSrc = e.videoUrl,
            e.videoWidth = e.width,
            e.videoHeight = e.height,
            e.videoDuration = 1e3 * e.videoTime,
            e.videoExtend = {
                h264: e.videoSrc || "",
                h265: e.h265url || ""
            },
            e.appid = e.appid || (e.topicId ? slide.config.appid : ""),
            e.tid = e.tid || e.topicId,
            1 != e.videoType || e.tid || (e.appid = 4),
            !e.ownerName && i && e.ownerUin == i.ownerUin && (e.ownerName = i.ownerName))
        },
        processSingleVideoRecData: function(e, t, i) {
            e && (e.needShowFollow = e.isFamous && !e.hasFollowed,
            e.topicId = e.tid,
            e.uploadTime = e.time,
            e.picKey = e.videoId,
            e.videoUrl = e.videoSrc,
            e.videoTypeName = 5 == e.videoType ? "直播" : "视频",
            e.title = e.videoTitle,
            e.desc = e.videoDesc || (e.ownerName ? e.ownerName + "的" : "") + e.videoTypeName,
            e.descText = r.ubb.ubb2attr(e.desc, {
                showAt: !0,
                showFaceImg: !0
            }),
            e.descHtml = r.ubb.ubb2html(e.desc, {
                showAt: !0
            }),
            e.pre = e.videoCover,
            e.url = e.videoCover,
            e.width = e.videoWidth,
            e.height = e.videoHeight,
            e.duration = e.videoDuration,
            e.durationStr = o.formatDuration(e.duration),
            e.cmtData && (e.cmtTotal = e.cmtData.num),
            t && (e.timeStamp = t))
        },
        processSinglePhotoVideoData: function(e, t, i) {
            e && (e.appid = e.appid || slide.config.appid,
            e.tid = e.tid || e.topicId,
            e.video_info && (e.ugcType = "video",
            e.videoType = 1,
            e.videoSource = -1,
            e.videoId = e.video_info.vid,
            e.videoWidth = e.video_info.cover_width,
            e.videoHeight = e.video_info.cover_height,
            e.videoDuration = e.video_info.duration,
            e.videoSrc = e.video_info.video_url,
            e.videoUrl = e.video_info.video_url,
            e.videoExtend = {
                h264: e.video_info.video_url || "",
                h265: e.video_info.video_h265url || "",
                shareH5: e.video_info.video_share_h5 || "http://h5.qzone.qq.com/ugc/share/video?uin=" + (e.ownerUin || QZONE.FP.getQzoneConfig("ownerUin")) + "&appid=4&cellid=" + e.albumId + "&busi_param_1=" + (e.sloc || e.lloc) + "&busi_param_2=" + e.lloc + "&busi_param_7=1"
            }),
            t && (e.timeStamp = t))
        },
        stat: require("./util.stat"),
        math: require("./util.math"),
        mood: require("./util.mood"),
        album: require("./util.album"),
        drag: require("./util.drag"),
        evt: require("./util.evt")
    }),
    o
}),
define.pack("./util.album", ["photo.v7/lib/jquery"], function(e, exports, module) {
    var s = e("photo.v7/lib/jquery")
      , e = {};
    return s.extend(e, {
        getImgUrl: function(e, t, i) {
            e = e || "";
            var e = s.trim(e)
              , o = /^(https?:\/\/group\.store\.qq\.com\/.+\/)(\d{2,})(.?)$/gi;
            if (/^(https?:\/\/t[\d]+\.qpic\.cn.+\/)[\d]+/.test(e))
                return /^(https?:\/\/t[\d]+\.qpic\.cn.+\/)[\d]+/.exec(e)[1] + 460;
            if (/^https?:\/\/a[\d]+\.qpic\.cn/gi.test(e)) {
                if (/\/[a-z]+\//gi.test(e))
                    return t ? e.replace(/\/[a-z]+\//gi, "/" + t + "/") : e;
                if (/\/[amicbro]&/gi.test(e))
                    return t ? e.replace(/\/[amicbro]&/gi, "/" + t + "&") : e
            }
            if (/^https?:\/\/m\.qpic\.cn/gi.test(e))
                return t ? e.replace(/\/[a-z]+\//gi, "/" + t + "/") : e;
            if (/^https?:\/\/mmsns\.qpic\.cn/gi.test(e))
                return e.replace(/\d*$/, 0);
            if (n = /(\d+)_(\w+)_([mbs])/.exec(e)) {
                if ("b" == t)
                    return e.replace(n[1] + "_" + n[2] + "_" + n[3], n[1] + "_" + n[2] + "_b");
                if ("a" == t)
                    return e.replace(n[1] + "_" + n[2] + "_" + n[3], n[1] + "_" + n[2] + "_a")
            }
            if (n = /^(https?:\/\/p\.qpic\.cn\/favpic\/.+\/)([\d]+)$/gi.exec(e)) {
                if ("b" == t)
                    return n[1] + "800";
                if ("a" == t)
                    return n[1] + "400"
            }
            if (/^(https?:\/\/group\.store\.qq\.com\/.+\/)(.+)$/gi.test(e) && (n = (n = o.exec(e)) || (o = /^(https?:\/\/group\.store\.qq\.com\/.+\/)(\d{2,})(.+)$/gi).exec(e))) {
                if ("b" == t)
                    return n[1] + "800" + n[3];
                if ("a" == t)
                    return n[1] + "100" + n[3]
            }
            if (/^(https?:\/\/ugc[\d]*\.qpic\.cn\/adapt\/.+\/)[\d]+/.test(e))
                return /^(https?:\/\/ugc[\d]*\.qpic\.cn\/adapt\/.+\/)[\d]+/.exec(e)[1] + {
                    b: 800,
                    c: 400,
                    m: 200,
                    i: 200,
                    a: 100
                }[t];
            if (-1 == e.search(/^https?:\/\/[a-z](\d+).photo.store.qq.com\//gi))
                return e;
            o = "a",
            o = "a" == (t = t || "a") || "i" == t ? "a" : "r" == t || "o" == t ? "r" : "b";
            i && (o = "o");
            var n = {};
            return -1 != (e = (e = trim(e)).replace(/\/[a-z]\//gi, "/" + t + "/")).search(/(&(\w)=(\d+)){0,1}&(\w)=(\d+)&(\w)=(\d+)$/gi) ? (n["" == RegExp.$2 ? "_tmp" : RegExp.$2] = RegExp.$3 + "",
            n[RegExp.$4] = RegExp.$5,
            n[RegExp.$6] = RegExp.$7,
            n[t] ? e.replace(/^(https?):\/\/[a-z](\d+)\./gi, "$1://" + o + n[t] + ".").replace(/\/[a-z]+\//gi, "/" + t + "/") : "m" == t ? e.replace(/^(https?):\/\/[a-z](\d+)\./gi, "$1://" + o + n.b + ".").replace(/\/[a-z]+\//gi, "/" + t + "/") : e) : e.match(/\/[a-z]\//gi) ? ("r" == t || "o" == t ? e.replace(/^(https?):\/\/[a-z](\d+)\./gi, "$1://" + (i ? "o" : "") + "r.") : e.replace(/^(https?):\/\/[a-z]/gi, "$1://" + o)).replace(/\/[a-z]+\//gi, "/" + t + "/") : e
        },
        getImgOriginUrl: function(e) {
            var t = PSY.helper.getImageInfoByUrl(e);
            return t && 0 != t.width && 0 != t.height || (t = PSY.helper.getImageInfoByUrl(PSY.string.htmlDecode(e))),
            t && t.ow && t.oh && 1 == t.type && (e = e.replace(/^(https?):\/\/(.+?)\/ps/i, "$1://r.photo.store.qq.com/ps").replace(/\/[a-z]\//i, "/o/")),
            e
        },
        reportSize: function(t) {
            t = s.extend({
                from: 1
            }, t),
            seajs.use("photo.v7/common/util/monitor/photosize", function(e) {
                e.normalCheck(t)
            })
        }
    }),
    e
}),
define.pack("./util.drag", ["photo.v7/lib/jquery"], function(e, exports, module) {
    var a = e("photo.v7/lib/jquery")
      , e = {};
    return a.extend(e, {
        bind: function(t) {
            var i, o, n = a(t.selector), e = t.event, s = (new Date,
            a("html").css("cursor"),
            0);
            document.body.setCapture && document.body.setCapture(!0),
            window.captureEvents && window.captureEvents(Event.MOUSEMOVE),
            e.preventDefault(),
            i = {
                x: e.pageX,
                y: e.pageY
            },
            t.startPos = i,
            t.start.call(n[0], t),
            a("html").css({
                cursor: "move"
            }),
            a(document.body).bind("mousemove.viewerDrag", function(e) {
                o = {
                    x: e.pageX,
                    y: e.pageY
                },
                ((o = {
                    x: o.x - i.x,
                    y: o.y - i.y
                }).x || o.y) && s++,
                s < 3 || (t.offsetPos = o,
                t.move.call(n[0], t, o))
            }),
            a(document.body).bind("mouseup.viewerDrag", function() {
                a("html").css({
                    cursor: ""
                }),
                a(document.body).unbind("mouseup.viewerDrag mousemove.viewerDrag"),
                document.body.releaseCapture && document.body.releaseCapture(),
                window.releaseEvents && window.releaseEvents(Event.MOUSEMOVE),
                t && t.stop && t.stop.call(window)
            })
        }
    }),
    e
}),
define.pack("./util.evt", ["photo.v7/lib/jquery"], function(e, exports, module) {
    var t, i = e("photo.v7/lib/jquery"), o = {}, e = window.ua;
    return e && (t = e.isiPad || e.isiPhone || e.isiPod),
    i.extend(o, {
        click: t ? "touchend" : "click",
        mouseover: t ? "touchend" : "mouseover",
        mouseleave: t ? "touchend" : "mouseleave",
        mouseout: t ? "touchend" : "mouseout",
        mouseenter: t ? "touchstart" : "mouseenter",
        mousedown: t ? "touchstart" : "mousedown",
        mousemove: t ? "touchmove" : "mousemove"
    }),
    o
}),
define.pack("./util.math", ["photo.v7/lib/jquery"], function(require, exports, module) {
    var e = {};
    return require("photo.v7/lib/jquery").extend(e, {
        maxmin: function(e, t, i) {
            return t < e ? t : e < i ? i : e
        }
    }),
    e
}),
define.pack("./util.mood", ["photo.v7/lib/jquery", "./tmpl"], function(e, exports, module) {
    var t = e("photo.v7/lib/jquery")
      , e = (e("./tmpl"),
    {});
    return t.extend(e, {
        replaceEmoticon: function(e) {
            return QZONE.FP.removeUBB(e)
        },
        replaceAt: function(e) {
            return e.replace(/@\{uin:(.+?),nick:(.+?)(?:,who:(\d+))?\}/g, function(e, t, i, o) {
                return '<a class="qz_311_mention nickname" target="_blank" href="' + (o && 3 == o ? "http://rc.qzone.qq.com/myhome/weibo/profile/" + t : "http://user.qzone.qq.com/" + t) + '">@' + i + "</a>"
            })
        },
        replaceTopic: function(e) {
            e = e.replace(/&#039;/g, "'");
            return e = (e = e.replace(/#([^#]+)?#/g, function(e, t) {
                return '<a target="_blank" href="http://rc.qzone.qq.com/qzonesoso/?search=' + t + '&businesstype=mood">#' + t + "#</a>"
            })).replace(/'/g, "&#039;")
        },
        replaceLink: function(e) {
            return e.replace(/(http:\/\/(?:[^\s\?#]+)?)(\s+|$|\?|#)/g, function(e, t, i) {
                return '<a target="_blank" href="' + t + '">' + t + "</a>" + i
            })
        },
        getRtHtml: function(e) {
            for (var t, i = [], o = 0, n = e.length; o < n; o++) {
                var s = e[o];
                i.push('|| <a class="qz_311_author nickname" target="_blank" href="http://user.qzone.qq.com/', s.uin, '">@', s.name, "</a>:", this.replaceLink(s.content))
            }
            return t = i.join(""),
            t = this.replaceAt(this.replaceEmoticon(t)),
            this.replaceTopic(t)
        }
    }),
    e
}),
define.pack("./util.stat", ["photo.v7/lib/jquery", "photo.v7/lib/photo", "v8/ic/videoManager/videoUtil"], function(require, exports, module) {
    var d = require("photo.v7/lib/jquery")
      , s = require("photo.v7/lib/photo")
      , i = require("v8/ic/videoManager/videoUtil")
      , o = s.user.getLoginUin()
      , l = {
        table: "dc00321",
        getReserves: function(e, t) {
            return "videoandrec" == e ? t ? 2 : 1 : "video" == e ? t ? 4 : 3 : void 0
        },
        exposure: {
            actiontype: 5,
            subactiontype: 1,
            needIndex: !0,
            needReportExposure: !1
        },
        clickThumb: {
            actiontype: 5,
            subactiontype: 2,
            needIndex: !0,
            needReportExposure: !0
        },
        head: {
            actiontype: 5,
            subactiontype: 3,
            needReportExposure: !0
        },
        nickname: {
            actiontype: 5,
            subactiontype: 4,
            needReportExposure: !0
        },
        like: {
            actiontype: 5,
            subactiontype: 5,
            needReportExposure: !0,
            needReportInteract: "like"
        },
        unlike: {
            actiontype: 5,
            subactiontype: 6,
            needReportExposure: !0
        },
        addCmtSucc: {
            actiontype: 5,
            subactiontype: 7,
            needReportExposure: !0,
            needReportInteract: "comment"
        },
        addReplySucc: {
            actiontype: 5,
            subactiontype: 8,
            needReportExposure: !0
        },
        retweetSucc: {
            actiontype: 5,
            subactiontype: 9,
            needReportExposure: !0,
            needReportInteract: "retweet"
        },
        follow: {
            actiontype: 5,
            subactiontype: 10,
            needReportExposure: !0
        },
        cancelFollow: {
            actiontype: 5,
            subactiontype: 11,
            needReportExposure: !0
        },
        downloadVideo: {
            actiontype: 5,
            subactiontype: 12,
            needReportExposure: !0
        },
        collect: {
            actiontype: 5,
            subactiontype: 13,
            needReportExposure: !0
        },
        delcollect: {
            needReportExposure: !0
        },
        report: {
            needReportExposure: !0
        },
        prevPhotoBtn: {
            actiontype: 5,
            subactiontype: 14
        },
        nextPhotoBtn: {
            actiontype: 5,
            subactiontype: 15
        },
        clickPrevPage: {
            actiontype: 5,
            subactiontype: 16
        },
        clickNextPage: {
            actiontype: 5,
            subactiontype: 17
        }
    }
      , p = {};
    return d.extend(p, {
        speedSend: function() {
            setTimeout(function() {
                var e = s.loadTimes
                  , t = slide.config.timeStamp && slide.config.timeStamp.getTime() || (new Date).getTime()
                  , i = slide.config.stat.speedFlag;
                s.oz.speedSetBase(i, t || e.basejsLoaded - 1),
                s.oz.speedSet(i + "-1", e.basejsLoaded),
                s.oz.speedSet(i + "-2", e.jSolutionLoaded),
                s.oz.speedSet(i + "-3", e.firstGetPhotos),
                s.oz.speedSet(i + "-4", e.firstEndGetPhotos),
                s.oz.speedSet(i + "-5", e.firstInitComment),
                s.oz.speedSet(i + "-6", e.firstLoadCommentJs),
                s.oz.speedSet(i + "-7", e.onCommentRenderReady),
                s.oz.speedSend(i)
            }, 1e3)
        },
        returnCode: function(n) {
            setTimeout(function() {
                var e = n.flag1
                  , t = n.code
                  , i = 0 == t ? 1 : 2
                  , o = 1 != i ? 1 : 100;
                s.oz.returnCode({
                    flag1: e,
                    flag2: i,
                    code: t,
                    rate: o
                })
            }, 1e3)
        },
        pingpv: function(e, t) {
            var i = slide.config.from || "other"
              , o = slide.config.appid
              , n = slide.config.type;
            try {
                QZONE.FP._t.TCISD.hotClick("/viewer2." + i + "." + o + "." + e, "photoclick.qzone.qq.com", "icenter_popup_2012.html")
            } catch (e) {}
            if ("videoandrec" == n || "video" == n) {
                var s = l[e];
                if (s) {
                    if (s.needIndex && isNaN(t))
                        throw new Error("report need index!");
                    isNaN(t) && (t = slide.index);
                    var a, r = slide.photos[t];
                    !s.actiontype || (a = p.getDataForReportToCompass(r)) && p.reportCompass(d.extend(a, s, {
                        reserves: l.getReserves(n, slide.config.isRec),
                        video_play_scene: 0 == t ? 4 : 5
                    }), e),
                    s.needReportExposure && !r.expoReported && d('#js-thumb-ctn li.js-thumb-item[data-index="' + t + '"]').trigger("exposure"),
                    s.needReportInteract && p.reportInteract(r, s.needReportInteract)
                }
            }
        },
        reportPV: function() {
            var e = slide.config.from || "other"
              , t = slide.config.appid;
            slide.config.type;
            try {
                QZONE.FP._t.TCISD.pv("photo.qzone.qq.com", "/qzone/photo/viewer2.html/" + t + "/" + e)
            } catch (e) {}
        },
        getVideoInfo: function(e) {
            return e
        },
        expoWaitingList: [],
        expoWaitingTimer: null,
        reportExposure: function(e, t) {
            "videoandrec" != slide.config.type && "video" != slide.config.type || (e = p.getVideoInfo(e),
            p.expoWaitingList.push(e),
            p.expoWaitingTimer || (p.expoWaitingTimer = setTimeout(p.forceReportExposure, 5e3)),
            10 <= p.expoWaitingList.length && p.forceReportExposure(),
            p.pingpv("exposure", t))
        },
        forceReportExposure: function() {
            var e;
            p.expoWaitingList.length && (clearTimeout(p.expoWaitingTimer),
            p.expoWaitingTimer = null,
            e = p.expoWaitingList,
            p.expoWaitingList = [],
            i && i.reportExposure({
                scene: 4,
                list: e
            }))
        },
        reportInteract: function(e, t) {
            "videoandrec" != slide.config.type && "video" != slide.config.type || (e = p.getVideoInfo(e),
            i && i.reportInteract({
                scene: 4,
                videoInfo: e,
                action: t
            }))
        },
        getDataForReportToCompass: function(e) {
            if ("videoandrec" == slide.config.type || "video" == slide.config.type) {
                e = p.getVideoInfo(e);
                return i && i.getDataForReportToCompass && i.getDataForReportToCompass(e)
            }
        },
        reportCompass: function(e, t) {
            e && ("videoandrec" != slide.config.type && "video" != slide.config.type || s.oz.reportCompass(e.table || "dc00321", d.extend({
                _key: "viewer." + t,
                uin: o,
                actiontype: 0,
                subactiontype: 0,
                reserves: 0,
                video_play_scene: 4,
                qua: "V1_PC_QZ_1.0.0_0_IDC_B",
                network_type: 6,
                device: 1
            }, e), 1))
        },
        reportTextToCompass: function(e, t) {
            try {
                s.oz.reportTextToCompass && s.oz.reportTextToCompass(e, 1, {
                    type: "viewer2/" + (t || "unknown_type")
                })
            } catch (e) {}
        }
    }),
    p
}),
define.pack("./viewer", ["photo.v7/lib/jquery", "./event", "./tmpl", "./util", "./imgMap", "./api.photos"], function(require, exports, module) {
    var h, v = require("photo.v7/lib/jquery"), _ = require("./event"), s = require("./tmpl"), w = require("./util"), u = require("./imgMap"), o = require("./api.photos"), a = w.evt, e = {};
    return v.extend(e, {
        init: function() {
            window.performance && performance.webkitSetResourceTimingBufferSize && performance.webkitSetResourceTimingBufferSize(500),
            !0 !== slide.config.forceShowCloseBtn && (w.getParameter("closeBtn") ? (v(".photo_layer_close").css({
                top: 0,
                right: 0
            }),
            v(".photo_layer_close").on(a.click, function() {
                window.external && window.external.Hummer_Window_Close && window.external.Hummer_Window_Close()
            })) : w.getParameter("inqq") && v(".photo_layer_close").remove(),
            w.getParameter("inqq") && v("body").css("background-color", "#000")),
            this.wrapper = v("#js-viewer-main"),
            this.figure = v("#js-viewer-figure"),
            this.imgWrapper = this.wrapper.find("#js-viewer-imgWraper"),
            this.imgCtn = v("#js-image-ctn"),
            this.figureArea = v("#js-figure-area").hide(),
            this.blankUrl = "http://" + (siDomain || "qzonestyle.gtimg.cn") + "/ac/b.gif",
            this._lastViewerW = 0,
            this._lastViewerH = 0,
            this._mouseInImgWrapper = !1,
            this._hideFigureArea = slide.config.viewer.hideFigureArea,
            this._hideFigureHandle = slide.config.viewer.hideFigureHandle,
            this.resetRotate(),
            this.bind(),
            slide && slide.option && ("video" == slide.option.type || "videoandrec" == slide.option.type) ? (this.imgWrapper.css("margin-top", -16),
            v("#js-img-disp").css("opacity", 0)) : (this.imgWrapper.css("margin-top", 0),
            v("#js-img-disp").css("opacity", 1)),
            "normal" == slide.getMode() ? this.setViewerSize({
                first: !0
            }) : "full" == slide.getMode() ? slide && "video" == slide.ugcType || "video" == slide.option.type || "videoandrec" == slide.option.type ? (_.playVideo = !0,
            this.setFullViewerSize({
                first: !0
            })) : (slide.setMode("normal"),
            this.setViewerSize({
                first: !0
            })) : "hd" == slide.getMode() ? this.setHDViewerSize({
                first: !0
            }) : (slide.setMode("normal"),
            this.setViewerSize({
                first: !0
            })),
            u.init(),
            this.showImg({
                first: !0
            }),
            this.bindMouseWheel(),
            setTimeout(function() {
                if (w.getParameter("inqq"))
                    try {
                        v("#js-focus-input")[0].focus()
                    } catch (e) {}
                else
                    try {
                        top.window.focus()
                    } catch (e) {}
            }, 1e3)
        },
        bind: function() {
            var h;
            this._hasBindEvent || (this._hasBindEvent = !0,
            (w.getParameter("inqq") || window.inqq) && this.wrapper.delegate("a", a.click, function() {
                var t = this.href
                  , e = (this.href || "").toLowerCase()
                  , i = (this.target || "").toLowerCase();
                if ((0 == e.indexOf("http://") || 0 == e.indexOf("https://")) && "_blank" == i)
                    return require.async("photo.v7/common/client/wrapper", function(e) {
                        e.openUrl(t)
                    }),
                    !1
            }),
            h = this,
            _.bind("go", function(e, t) {
                if (t = t || {},
                _.playVideo = t.photo && "video" == t.photo.ugcType || "video" == slide.option.type || "videoandrec" == slide.option.type,
                h._hideFigureArea = slide.config.viewer.hideFigureArea,
                h._hideFigureHandle = slide.config.viewer.hideFigureHandle,
                !slide.config.viewer.hideRotate && t.photo && "video" != t.photo.ugcType && 2 != PSY.helper.getImageInfoByUrl(t.photo.originUrl || t.photo.url).type ? v("#js-btn-rotateRight").show() : v("#js-btn-rotateRight").hide(),
                "video" != slide.option.type || t.photo && t.photo.topicId ? h._showCommentInfo() : h._hideCommentInfo(),
                (t.first || h._mouseInImgWrapper) && h.imgWrapper.trigger(a.mouseenter),
                (t.photo || slide.photos[slide.index]) && _.trigger("photoDataReceived"),
                v("#js-btn-saveRotate").hide(),
                _.stopGo || t.first) {
                    var i = h.showTags(t.photo);
                    return v("#js-img-border").append(i),
                    t.first && ("full" == slide.getMode() ? (v("#js-switch-inner").css({
                        top: 50
                    }),
                    v("#js-thumb-subctn").css({
                        top: "videoandrec" == slide.option.type ? 0 : slide.config.thumbNail.imgHeight
                    })) : (v("#js-switch-inner").css({
                        top: 0
                    }),
                    v("#js-thumb-subctn").css({
                        top: "videoandrec" == slide.option.type ? 0 : -55
                    })),
                    h.checkMode()),
                    !1
                }
                v("#js-img-border").css("cursor", ""),
                v("#js-btn-changeMode").removeClass("js-show-origin").addClass("js-show-normal").attr("title", "点击放大").find("i").removeClass("icon-minify").addClass("icon-magnify");
                var o = slide.config.stat.imgShowTime;
                o && PSY.oz.speedSetBase(o, +new Date),
                h.delayShowImgTimer && (clearTimeout(h.delayShowImgTimer),
                h.delayShowImgTimer = null);
                var n = t.photo
                  , s = slide.photos.length;
                h.resetRotate({
                    hide: !0
                });
                i = v("#js-figure-area .js-hd-button"),
                o = v("#js-figure-area .js-large-button");
                n && n.origin ? (i.show(),
                o.hide()) : (i.hide(),
                o.show()),
                ua && ua.ie && (h.imgCtn.find("img:first-child").remove(),
                h.imgCtn.prepend('<img src="' + h.blankUrl + '" id="js-img-disp" style="display:none;position:absolute;" hideFocus="true"/>'),
                slide && slide.option && ("video" == slide.option.type || "videoandrec" == slide.option.type) ? v("#js-img-disp").css("opacity", 0) : v("#js-img-disp").css("opacity", 1)),
                "hd" == slide.getMode() ? h.setHDViewerSize({
                    photo: n
                }) : "full" == slide.getMode() ? h.setFullViewerSize({
                    photo: n
                }) : h.setViewerSize({
                    photo: n
                }),
                h.delayShowImgTimer = setTimeout(function() {
                    h.showImg({
                        photo: n,
                        first: t.first
                    })
                }, 0),
                (0 == t.prev && t.curr == s - 1 || 0 == t.prev && 0 == t.curr) && _.trigger("first2last", {
                    total: s
                }),
                t.prev == s - 1 && 0 == t.curr && _.trigger("last2first")
            }),
            _.bind("playVideo", function(e, t) {
                h._hideFigureArea = !0,
                h.figureArea.hide()
            }),
            _.bind("onFixImgPosition", function(e, t) {
                "normal" == slide.getMode() && v("#js-thumb-ctn").css("opacity", 1)
            }),
            _.bind("enterOriginMode", function(e, t) {
                h.changeMode()
            }),
            _.bind("afterWindowResize", function(e, t) {
                if (slide.isOpen()) {
                    "hd" == slide.getMode() ? h.setHDViewerSize() : "full" == slide.getMode() ? h.setFullViewerSize({
                        resize: !0
                    }) : h.setViewerSize();
                    try {
                        var i = h.imgCtn.find("img:visible")
                          , o = i.attr("src")
                          , n = h.getDisplayInfoByMode()
                          , s = n && n.width || i.width()
                          , i = n && n.height || i.height();
                        slide.imgCache,
                        slide.imgCache[o];
                        h.fixImgPosition({
                            url: n.url || o,
                            width: s,
                            height: i
                        })
                    } catch (e) {}
                    h.checkMode()
                }
            }),
            _.bind("close", function() {
                h.dispose()
            }),
            _.bind("enterFullScreenMode", function() {
                var e = slide.photos[slide.index];
                h.resetRotate(),
                v("#js-switch-inner").animate({
                    top: 50
                }),
                slide.setMode("full"),
                v("#js-viewer-container").removeClass("mod-normal"),
                v("#js-thumb-subctn").animate({
                    top: "videoandrec" == slide.option.type ? 0 : slide.config.thumbNail.imgHeight
                }, function() {
                    h.setFullViewerSize(),
                    h.showImg({
                        photo: e
                    }),
                    _.trigger("slideModeChange")
                })
            }),
            _.bind("enterHDMode", function() {
                var e = slide.photos[slide.index];
                h.resetRotate(),
                slide.setMode("hd"),
                v("#js-viewer-container").removeClass("mod-normal"),
                h.figure.css({
                    marginTop: 0,
                    marginLeft: 0
                }),
                h.setHDViewerSize(),
                h.showImg({
                    photo: e
                })
            }),
            _.bind("quitHDMode", function() {
                var e;
                w.isFullScreenStatus() ? w.exitFullScreen() : (e = slide.photos[slide.index],
                h.resetRotate(),
                slide.config.sideBar && slide.config.sideBar.width && v("#js-sidebar-ctn").show(),
                v("#js-thumb-ctn").show(),
                v("#js-viewer-container").addClass("mod-normal"),
                v("#js-viewer-container").css("padding-top", "16px"),
                v("#js-btn-changeMode").removeClass("js-show-origin").addClass("js-show-normal").attr("title", "点击放大").find("i").removeClass("icon-minify").addClass("icon-magnify"),
                u.hideMap(),
                slide.setLastMode(),
                v("#js-figure-area").find("a.js-normal-mode").addClass("selected-mode"),
                "normal" == slide.getMode() ? h.setViewerSize() : "full" == slide.getMode() ? h.setFullViewerSize() : "hd" == slide.getMode() && h.setHDViewerSize(),
                h.showImg({
                    photo: e
                }),
                _.trigger("slideModeChange"),
                v("#js-hdmode-close").siblings(".photo_layer_close").show(),
                v("#js-hdmode-close").hide().removeClass("photo-full-close"))
            }),
            _.bind("quitFullScreenMode", function() {
                var e = slide.photos[slide.index];
                h.resetRotate(),
                h.imgWrapper.css({
                    marginLeft: 10
                }),
                v("#js-viewer-container").addClass("mod-normal"),
                v("#js-btn-changeMode").removeClass("js-show-origin").addClass("js-show-normal").find("i").removeClass("icon-minify").addClass("icon-magnify"),
                u.hideMap(),
                slide.setLastMode(),
                h.setViewerSize(),
                e && e.url && (h.showImg({
                    photo: e
                }),
                _.trigger("slideModeChange")),
                v("#js-switch-inner").animate({
                    top: 0
                }),
                v("#js-thumb-subctn").animate({
                    top: "videoandrec" == slide.option.type ? 0 : -55
                })
            }),
            _.bind("showImgLoading", function(e, t) {
                var i, o, n;
                "video" != slide.option.type && "videoandrec" != slide.option.type && (i = v("#js-image-ctn"),
                0 == (o = i.siblings(".figure_img_loading")).length && (i.before(s.imgLoading),
                o = i.siblings(".figure_img_loading")),
                n = o.data("tid"),
                clearTimeout(n),
                n = setTimeout(function() {
                    o.show().width(i.width()).height(i.height())
                }, 1e3),
                o.data("tid", n))
            }),
            _.bind("hideImgLoading", function(e, t) {
                var i = v("#js-image-ctn").siblings(".figure_img_loading").hide();
                clearTimeout(i.data("tid"))
            }),
            this.imgCtn.bind("mousemove", function(e) {
                "video" != slide.option.type && "videoandrec" != slide.option.type && (v("#js-btn-changeMode").hasClass("js-show-origin") && v("#js-btn-changeMode").is(":visible") ? h.imgCtn.css({
                    cursor: "move"
                }) : (h.imgCtn.css({
                    cursor: ""
                }),
                h.imgCtn.find("#js-img-border").css("cursor", "")),
                h.updateCursor(e))
            }),
            v("#js-btn-nextPhoto").bind("mouseenter", function(e) {
                "video" != slide.option.type && "videoandrec" != slide.option.type || v("#js-btn-nextPhoto").addClass("arrow-next-hover")
            }).bind("mouseleave", function(e) {
                "video" != slide.option.type && "videoandrec" != slide.option.type || v("#js-btn-nextPhoto").removeClass("arrow-next-hover")
            }),
            v("#js-btn-prevPhoto").bind("mouseenter", function(e) {
                "video" != slide.option.type && "videoandrec" != slide.option.type || v("#js-btn-prevPhoto").addClass("arrow-pre-hover")
            }).bind("mouseleave", function(e) {
                "video" != slide.option.type && "videoandrec" != slide.option.type || v("#js-btn-prevPhoto").removeClass("arrow-pre-hover")
            }),
            this.imgWrapper.bind(a.mouseenter + " " + a.mousemove, function(e) {
                h._mouseInImgWrapper && e && e.type == a.mousemove || (h._mouseInImgWrapper = !0,
                0 == slide.photos.length || _.hideFigureArea || _.quanren ? h.figureArea.hide() : (h._hideFigureHandle ? h.figureArea.find(".figure-handle").hide() : h.figureArea.find(".figure-handle").show(),
                h._hideFigureArea ? h.figureArea.hide() : h.figureArea.show(),
                v("#js-btn-prevPhoto").stop(),
                v("#js-btn-nextPhoto").stop(),
                slide.photos && 1 < slide.photos.length && ("video" == slide.option.type || "videoandrec" == slide.option.type ? (0 < slide.index ? v("#js-btn-prevPhoto").show() : v("#js-btn-prevPhoto").hide(),
                slide.index < slide.photos.length - 1 ? v("#js-btn-nextPhoto").show() : v("#js-btn-prevPhoto").hide()) : (v("#js-btn-prevPhoto").show(),
                v("#js-btn-nextPhoto").show())),
                h.delayHidePageBtnTimer && clearTimeout(h.delayHidePageBtnTimer),
                (e = slide.photos && slide.photos[slide.index]) && e.raw && "normal" == slide.getMode() && 2 != e.phototype && "video" != e.ugcType ? v("#js-link-hd").show().attr("canBeShow", 1) : v("#js-link-hd").hide().attr("canBeShow", 0)))
            }).bind(a.mouseleave, function(e) {
                if (h._mouseInImgWrapper = !1,
                v("#js-btn-saveRotate").is(":visible"))
                    return !1;
                var t = h.imgWrapper.offset()
                  , i = h.imgWrapper.width()
                  , o = h.imgWrapper.height();
                if (t.left < e.clientX && t.top - window.scrollY < e.clientY && t.left + i > e.clientX && t.top - window.scrollY + o > e.clientY)
                    return h._hideFigureArea ? h.figureArea.hide() : h.figureArea.stop().show(),
                    !1;
                h._hideFigureArea ? h.figureArea.hide() : h.figureArea.stop().fadeOut(),
                v(".func-more-drop").hide(),
                v("#js-btn-moreOper").removeClass("js-show-menu").removeClass("icon-wrap-select"),
                v("#js-btn-prevPhoto").removeClass("arrow-pre-hover").fadeOut("fast"),
                v("#js-btn-nextPhoto").removeClass("arrow-next-hover").fadeOut("fast"),
                v("#js-link-hd").hide().attr("canBeShow", 0)
            }),
            v("#js-btn-play-gif").bind(a.click, function(e) {
                var t = slide.index
                  , i = slide.photos[t];
                w.stat.pingpv("playGifBtn"),
                PSY.oz.returnCodeV4({
                    cgi: "/viewer2/gif",
                    domain: "photomonitor.qzone.qq.com",
                    type: 1,
                    code: 1,
                    time: 100,
                    rate: 10
                }),
                PSY.oz.returnCode({
                    flag1: 110425,
                    flag2: 1,
                    code: 1,
                    rate: 10,
                    delay: 100
                });
                t = v("#js-image-ctn img"),
                i = (i = i.url).replace("&t=5", "");
                v("#js-btn-play-gif").hide(),
                t.attr("src", i)
            }),
            this.imgCtn.add(".js-btn-changePhoto").bind(a.click, function(e, t) {
                var i = slide.index
                  , o = i
                  , n = slide.photos[i]
                  , s = slide.photos[slide._firstPhotoIndex]
                  , a = slide.photos.length
                  , r = h.imgCtn.offset()
                  , d = h.imgCtn.width()
                  , l = e.pageX
                  , p = (e.pageY,
                v(e.target))
                  , c = "right";
                if (!(_.stopGo && p.is("img") || _.quanren || slide._isGettingPhotoList || a <= 0 || v("#js-btn-changeMode").hasClass("js-show-origin") && "js-img-border" == p.attr("id"))) {
                    if (_.stopGo && v("#js-btn-changeMode").hasClass("js-show-origin") && !p.is("img"))
                        _.stopGo = !1;
                    else if (!p.hasClass("js-btn-changePhoto") && (n && "video" == n.ugcType || "video" == slide.option.type || "videoandrec" == slide.option.type))
                        return !1;
                    slide.closeQRRcd(),
                    slide.closeQQAd();
                    p = t && t.auto;
                    l - r.left < d / 4 ? (c = "left",
                    0 < i && (i = (i + a - 1) % a),
                    ua && ua.ie ? w.stat.pingpv("prevPhoto.ie") : ua && ua.chrome || ua && ua.webkit ? w.stat.pingpv("prevPhoto.chrome") : w.stat.pingpv("prevPhoto.other"),
                    !p && v(e.target).hasClass("js-btn-changePhoto") && w.stat.pingpv("prevPhotoBtn")) : (i = (i + 1) % a,
                    ua && ua.ie ? w.stat.pingpv("nextPhoto.ie") : ua && ua.chrome || ua && ua.webkit ? w.stat.pingpv("nextPhoto.chrome") : w.stat.pingpv("nextPhoto.other"),
                    !p && v(e.target).hasClass("js-btn-changePhoto") && w.stat.pingpv("nextPhotoBtn")),
                    n && n.batchId && (n.batchId,
                    s && s.batchId),
                    _.trigger("beforeGo", {
                        prev: o,
                        curr: i,
                        photo: slide.photos[i],
                        direction: c,
                        opt: t
                    }),
                    _.stopGo || (_.stopGo = !1,
                    !slide.config.getListAfterFirst && 311 == slide.config.appid && 1 == slide.photos.length || (slide.index = i,
                    s = slide.photos[o],
                    (c = slide.photos[i]) && s && (c.ugcType && s.ugcType && c.ugcType != s.ugcType || c.albumId && s.albumId && c.albumId != s.albumId) && (s = c.ugcType,
                    slide.reload(s, c)),
                    _.trigger("go", {
                        prev: o,
                        curr: i,
                        photo: slide.photos[i],
                        opt: t
                    })))
                }
            }),
            v(document).bind("keydown.viewer2", function(e) {
                if (slide.isOpen() && !slide._isFullScreen && !_.quanren) {
                    var t = slide.index
                      , i = slide.photos.length
                      , o = (t + 1) % i
                      , n = (t + i - 1) % i
                      , s = o
                      , t = t
                      , a = "right";
                    switch (e.keyCode) {
                    case 37:
                        s = n,
                        a = "left",
                        ua && ua.ie ? w.stat.pingpv("prevPhoto.ie") : ua && ua.chrome || ua && ua.webkit ? w.stat.pingpv("prevPhoto.chrome") : w.stat.pingpv("prevPhoto.other");
                        break;
                    case 39:
                        s = o,
                        ua && ua.ie ? w.stat.pingpv("nextPhoto.ie") : ua && ua.chrome || ua && ua.webkit ? w.stat.pingpv("nextPhoto.chrome") : w.stat.pingpv("nextPhoto.other");
                        break;
                    case 27:
                        return void slide.close();
                    default:
                        return
                    }
                    !slide.config.getListAfterFirst && 311 == slide.config.appid && 1 == slide.photos.length || slide._isGettingPhotoList || (_.trigger("beforeGo", {
                        prev: t,
                        curr: s,
                        photo: slide.photos[s],
                        direction: a
                    }),
                    _.stopGo || (_.stopGo = !1,
                    slide.index = s,
                    _.trigger("go", {
                        prev: t,
                        curr: s,
                        photo: slide.photos[s]
                    })))
                }
            }),
            v("#js-viewer-container").on(a.click, function() {
                var e = v("#js-btn-moreOper");
                e.siblings(".func-more-drop").hide(),
                e.hasClass("js-show-menu") && e.removeClass("js-show-menu").removeClass("icon-wrap-select")
            }),
            this.wrapper.delegate("#js-btn-rotateLeft", a.click, function() {
                h.rotateLeft()
            }),
            this.wrapper.delegate("#js-btn-rotateRight", a.click, function() {
                return _.quanren ? QZONE.FP.showMsgbox("圈人时无法旋转图片", 3, 2e3) : (h.rotateRight(),
                w.stat.pingpv("xuanzhuan")),
                !1
            }),
            this.wrapper.delegate("#js-btn-changeMode", a.click, function(e) {
                e.stopPropagation(),
                h.changeMode(),
                w.stat.pingpv("zoom")
            }),
            this.wrapper.delegate("#js-btn-tuya", a.click, function(e) {
                e.stopPropagation(),
                h.tuya()
            }),
            this.wrapper.delegate(".js-large-mode", a.click, function(e) {
                var t = v(this);
                return v("#js-btn-changeMode").hasClass("js-show-origin") && (v("#js-btn-changeMode").removeClass("js-show-origin").addClass("js-show-normal").attr("title", "点击放大").find("i").removeClass("icon-minify").addClass("icon-magnify"),
                u.hideMap()),
                "hd" == slide.getMode() && _.trigger("quitHDMode"),
                slide.setMode("full"),
                t.siblings().removeClass("selected-mode"),
                t.addClass("selected-mode"),
                _.trigger("enterFullScreenMode"),
                w.stat.pingpv("big"),
                !1
            }),
            this.wrapper.delegate(".js-normal-mode", a.click, function(e) {
                var t = v(this);
                if (t.siblings().removeClass("selected-mode"),
                t.addClass("selected-mode"),
                v("#js-btn-changeMode").hasClass("js-show-origin") && v("#js-btn-changeMode").removeClass("js-show-origin").addClass("js-show-normal").attr("title", "点击放大").find("i").removeClass("icon-minify").addClass("icon-magnify"),
                "full" == slide.getMode() && (_.trigger("quitFullScreenMode"),
                slide.setMode("normal")),
                "hd" == slide.getMode()) {
                    if (w.supportFullScreen() && w.isFullScreenStatus)
                        return void w.exitFullScreen();
                    _.trigger("quitHDMode")
                }
                return slide.setMode("normal"),
                h.setViewerSize(),
                h.showImg({
                    photo: slide.photos[slide.index]
                }),
                w.stat.pingpv("small"),
                !1
            }),
            this.wrapper.delegate(".js-hd-mode", a.click, function(e) {
                return v("#js-btn-changeMode").hasClass("js-show-origin") && (v("#js-btn-changeMode").removeClass("js-show-origin").addClass("js-show-normal").attr("title", "点击放大").find("i").removeClass("icon-minify").addClass("icon-magnify"),
                u.hideMap()),
                w.isFullScreenStatus && w.exitFullScreen(),
                "full" == slide.getMode() && _.trigger("quitFullScreenMode"),
                v("#js-figure-area").find("a.selected-mode").removeClass("selected-mode"),
                v(this).addClass("selected-mode"),
                _.trigger("enterHDMode"),
                w.stat.pingpv("hd"),
                !1
            }),
            v(document).delegate("#js-img-border", a.mousedown, function(e) {
                if (e.preventDefault(),
                !v("#js-btn-changeMode").hasClass("js-show-normal"))
                    return h.doDrag(e),
                    !1
            }))
        },
        showTags: function(e) {
            var t = (e || {}).tags || []
              , i = "";
            if (!t || t.length < 1)
                return "";
            for (var o = v("#js-img-border").width(), n = v("#js-img-border").height(), s = 0; s < t.length; s++) {
                var a = t[s]
                  , r = 900 < a.y_scale ? 900 : a.y_scale
                  , d = Math.floor(a.x_scale * o / 1e3)
                  , l = Math.floor(r * n / 1e3)
                  , r = a.direction <= 1 ? " right-mark" : " left-mark";
                1 == a.direction ? r += " reverse-mark-right" : 3 == a.direction && (r += " reverse-mark-left"),
                i += '<div class="photo-mark' + r + '" style="left:' + d + "px;top:" + l + 'px;"><i class="icon-mark"></i><div class="photo-mark-con"><span class="left-mark-bg"></span><span class="mark-con">' + a.content + '</span><span class="right-mark-bg"></span></div></div>'
            }
            return i
        },
        bindMouseWheel: function() {
            var p = this;
            this.imgCtn.bind("mousewheel", function(e) {
                var t, i, o, n, s, a, r, d, l;
                v("#js-btn-changeMode").hasClass("js-show-normal") || (t = e.originalEvent,
                i = 0,
                o = (l = p._getDispImg()).position(),
                n = (d = slide.photos[slide.index]).width,
                s = d.height,
                "hd" != slide.getMode() && "full" != slide.getMode() || (n = d.originWidth || 0,
                s = d.originHeight || 0),
                0 != n && 0 != s && n && s || (n = l.width(),
                s = l.height()),
                a = p.imgCtn.width(),
                e = (r = p.imgCtn.height()) - s,
                d = o.top,
                l = 0,
                t.wheelDelta ? i = t.wheelDelta : t.detail && (i = t.detail),
                l = 0 < i ? n <= a || a < n && r < s ? Math.min(d + 100, 0) : Math.min(d + 100, e) : n <= a || a < n && r < s ? Math.max(d - 100, e) : Math.max(d - 100, 0),
                v("#js-img-disp").css({
                    top: l
                }),
                v("#js-img-border").css({
                    top: l
                }),
                u.setPosition({
                    left: o.left,
                    top: l,
                    imgW: n,
                    imgH: s,
                    viewerW: a,
                    viewerH: r
                }),
                setTimeout(function() {
                    _.trigger("imgScrollDone")
                }, 0))
            })
        },
        unBindMouseWheel: function() {
            this.imgCtn.off("mousewheel")
        },
        setHD: function(e) {
            if (e.photo || slide.photos[slide.index]) {
                var t = e.photo || slide.photos[slide.index]
                  , e = (t.origin,
                v("#js-link-hd"));
                e.find("a"),
                v("#js-hd-size"),
                t.originWidth,
                t.originHeight;
                return e.hide(),
                !1
            }
        },
        firstShowImg: function() {
            slide.config.pre;
            var e = w.album.getImgUrl(slide.config.pre, "b")
              , t = w.imgLoad
              , i = (slide.imgCache,
            slide.imgCache[e])
              , o = this.imgCtn
              , n = (new Date,
            v("#js-img-disp").hide())
              , s = v("#js-img-trans");
            if (v("#js-figure-area a.selected-mode").removeClass("selected-mode"),
            v("#js-figure-area a.js-normal-mode").addClass("selected-mode"),
            v("#js-img-border").hide(),
            i)
                return this.fixImgPosition(i),
                n.show(),
                void s.hide();
            var a = setTimeout(function() {
                o.addClass("figure_img_loading")
            }, 1e3);
            t(e, function(e) {
                clearTimeout(a),
                o.removeClass("figure_img_loading"),
                "about:blank;" != n.attr("src") && n.show();
                var t = slide.photos[slide.index];
                t && t.width && (v("#js-img-border").show(),
                w.album.reportSize({
                    width: t.width,
                    height: t.height,
                    loadWidth: e.width,
                    loadHeight: e.height
                }))
            })
        },
        _showImgMask: function(e) {
            var s = this
              , a = v("#js-img-border").show();
            a.length || (this.imgCtn.append('<div id="js-img-border" style="position:absolute;z-index:4;" class="figure_img_bor"></div>'),
            a = v("#js-img-border")),
            w.imgLoad(e, function(e) {
                var t = v("#js-img-disp")
                  , i = t.width() || e.width
                  , o = t.height() || e.height
                  , n = parseInt(t.css("top"))
                  , t = parseInt(t.css("left"))
                  , e = e.url;
                slide.config.enableWebpFlash && slide.config.enableWebpFlash() && (e = "about:blank;");
                e = v("#js-img-disp").clone(!1).attr("id", "").attr("style", "").attr("src", e).hide();
                a.html(e);
                e = "";
                slide.photos && slide.photos[slide.index] && (e = s.showTags(slide.photos[slide.index])),
                a.append(e),
                a.find("img").css({
                    opacity: 0
                }).show(),
                a.height(o).width(i).css({
                    left: t,
                    top: n
                }),
                _.trigger("imgShowDone")
            })
        },
        _hideImgMask: function() {
            v("#js-img-border").hide()
        },
        showImg: function(e) {
            var t = (e = e || {}).photo || {}
              , i = this.getDisplayInfoByMode({
                photo: t
            })
              , n = (slide.index,
            i.url)
              , s = t.pre || slide.option.pre
              , o = i.width
              , a = i.height
              , r = slide.imgCache
              , d = r[n]
              , l = w.imgLoad
              , i = this.imgCtn
              , p = v("#js-img-disp")
              , c = v("#js-img-trans")
              , h = e.first
              , u = this
              , m = "hd" == slide.getMode();
            "video" != slide.option.type && "videoandrec" != slide.option.type ? p.css("opacity", 1) : p.css("opacity", 0),
            i.removeClass("figure_img_loading"),
            _.trigger("hideImgLoading"),
            u._hideImgMask(),
            e.reshow || !w.isEmptyUrl(n) ? d ? v("#js-img-disp").attr("has-show") || (this.imgCtn.find("img").remove(),
            this.imgCtn.prepend('<img src="' + this.blankUrl + '" id="js-img-disp" style="display:none;position:absolute;" hideFocus="true"/><img src="' + this.blankUrl + '" id="js-img-trans" style="display:none;position:absolute;" hideFocus="true"/>'),
            slide && slide.option && ("video" == slide.option.type || "videoandrec" == slide.option.type) ? v("#js-img-disp").css("opacity", 0) : v("#js-img-disp").css("opacity", 1),
            u._showImgMask(n),
            (v("#js-btn-changeMode").hasClass("js-show-origin") || m) && (m = !0),
            l(n, function(e) {
                u.checkMode(),
                u.fixImgPosition({
                    url: d.url,
                    width: d.width,
                    height: d.height,
                    origin: m
                })
            }),
            c.hide(),
            e = slide.config.stat.imgShowTime,
            "normal" == slide.getMode() ? (QZONE.FP.isAlphaUser(!0) || QZONE.FP.getVipStatus(!0) ? PSY.oz.speedSet(e + "-3", +new Date) : PSY.oz.speedSet(e + "-1", +new Date),
            PSY && PSY.support.checkWebp() && QZONE.FP.isAlphaUser(!0) ? (PSY.oz.speedSet(e + "-5", +new Date),
            PSY.oz.speedSend(e, {
                sampling: 100,
                reportSampling: !1
            })) : PSY.oz.speedSend(e, {
                sampling: 10,
                reportSampling: !1
            })) : !t.origin || "hd" != slide.getMode() && "full" != slide.getMode() || (QZONE.FP.isAlphaUser(!0) || QZONE.FP.getVipStatus(!0) ? PSY.oz.speedSet(e + "-4", +new Date) : PSY.oz.speedSet(e + "-2", +new Date),
            PSY.oz.speedSend(e, {
                sampling: 100,
                reportSampling: !1
            }))) : s == n ? l(n, function(e) {
                "normal" == slide.getMode() ? u.setViewerSize({
                    first: !0
                }) : "full" == slide.getMode() ? u.setFullViewerSize({
                    first: !0
                }) : "hd" == slide.getMode() && u.setHDViewerSize({
                    first: !0
                }),
                u.checkMode(),
                u.fixImgPosition(e),
                u._showImgMask(n)
            }) : (l(s, function(e) {
                var t, i;
                if (!r[n] && o && a && a / o <= 2.5 ? (t = e.url,
                "full" != slide.getMode() || (e = (e = slide.photos[slide.index]) && e.url) && r[e] && (t = e),
                c.attr({
                    src: u.blankUrl
                }),
                u.checkMode(),
                u.fixImgPosition({
                    trans: !0,
                    url: t,
                    width: o,
                    height: a
                }),
                p.hide(),
                c.show()) : c.hide(),
                window.performance) {
                    if (performance.getEntries)
                        i = 150;
                    else {
                        if (!performance.webkitGetEntries)
                            return;
                        i = 151
                    }
                    seajs.use("photo.v7/common/report/resourceTiming", function(e) {
                        e.reportAsPerformance(s, 177, 1, i)
                    })
                }
            }),
            _.trigger("showImgLoading"),
            l(n, function(e) {
                if (_.trigger("hideImgLoading"),
                u.checkIndex(n) || h) {
                    PSY && PSY.helper.getImageInfoByUrl && n.indexOf("&bo=") && (o = PSY.helper.getImageInfoByUrl(n),
                    i = slide.getMode(),
                    o && ("normal" != i || o.bw == e.width && o.bh == e.height ? o.ow != e.width && o.oh != e.height && o.bw != e.width && o.bh != e.height && PSY.oz.reportText("full size error. url= " + n) : PSY.oz.reportText("normal size error. url= " + n))),
                    (v("#js-btn-changeMode").hasClass("js-show-origin") || m) && (e.origin = !0);
                    var t, i = u.imgCtn.width(), o = u.imgCtn.height();
                    if ((e.width > i || e.height > o) && "full" == slide.getMode() && u.setFullViewerSize(),
                    u.checkMode(),
                    u.fixImgPosition(e),
                    p.css({
                        zIndex: 3
                    }).show(),
                    c.hide(),
                    u._showImgMask(n),
                    window.performance) {
                        if (performance.getEntries)
                            t = 56;
                        else {
                            if (!performance.webkitGetEntries)
                                return;
                            t = 149
                        }
                        seajs.use("photo.v7/common/report/resourceTiming", function(e) {
                            e.reportAsPerformance(s, 177, 1, t)
                        })
                    }
                    o = slide.photos[slide.index];
                    o && o.width && (w.album.reportSize({
                        width: o.width,
                        height: o.height,
                        loadWidth: e.width,
                        loadHeight: e.height
                    }),
                    e = slide.config.stat.imgShowTime,
                    "normal" == slide.getMode() ? QZONE.FP.isAlphaUser(!0) || QZONE.FP.getVipStatus(!0) ? PSY.oz.speedSet(e + "-3", +new Date) : PSY.oz.speedSet(e + "-1", +new Date) : !o.origin || "hd" != slide.getMode() && "full" != slide.getMode() || (QZONE.FP.isAlphaUser(!0) || QZONE.FP.getVipStatus(!0) ? PSY.oz.speedSet(e + "-4", +new Date) : PSY.oz.speedSet(e + "-2", +new Date)),
                    PSY.oz.speedSend(e, {
                        sampling: 10,
                        reportSampling: !1
                    }))
                }
            })) : _.one("photoDataReceived", function(e, t) {
                t = t && t.photo || slide.photos && slide.photos[slide.index];
                u.showImg({
                    photo: t,
                    reshow: !0
                })
            })
        },
        fixImgPosition: function(e) {
            e = e || {};
            var i, o, n, t = this.imgCtn.width(), s = this.imgCtn.height(), a = e && e.url || v("#js-img-disp").attr("src") || "", r = slide.imgCache[a], d = e && e.width || r.width, l = e && e.height || r.height, p = v("#js-img-disp"), c = v("#js-img-trans"), h = v("#js-img-border"), u = p, m = (this.rotate,
            e.scale), g = e.changeMode, r = e.rotate, f = this;
            (!p.attr("has-show") || g || e.trans || e.rotate) && (i = 1 == m ? {
                w: d,
                h: l,
                scale: 1
            } : w.autoScale({
                maxw: t,
                maxh: s,
                sw: d,
                sh: l
            }),
            "video" != slide.option.type && "videoandrec" != slide.option.type || (d = slide.config.viewer.maxViewerWidth,
            l = slide.config.viewer.maxViewerHeight,
            i = w.autoScale({
                maxw: t,
                maxh: s,
                sw: d,
                sh: l
            })),
            o = (t - i.w) / 2,
            n = (s - i.h) / 2,
            e.trans && (u = c),
            l = u.attr("src"),
            a == l || e.trans || (l = PSY.helper.getImageInfoByUrl(a).type,
            slide.config.enableWebpFlash && slide.config.enableWebpFlash() && 2 !== l ? (r || seajs.use("photo.v7/common/webp/webp2Base64/webp2Base64", function(e) {
                -1 === a.indexOf("&t=5") && (a += "&t=5"),
                e.getDataUrl({
                    url: a,
                    callback: function(e, t) {
                        f.checkIndex(t) && (f._getDispImg().html(e).css({
                            left: o,
                            top: n,
                            width: i.w,
                            height: i.h
                        }).show(),
                        v("#js-img-disp").hide())
                    },
                    ctnWidth: i.w,
                    ctnHeight: i.h,
                    needSplit: ua && ua.ie && 8 == ua.ie
                })
            }),
            v("#js-img-disp").hide()) : u.attr("src", a)),
            u.attr("has-show", 1),
            p.css({
                left: o,
                top: n,
                width: i.w,
                height: i.h
            }),
            c.css({
                left: o,
                top: n,
                width: i.w,
                height: i.h
            }),
            h.css({
                left: o,
                top: n,
                width: i.w,
                height: i.h
            }),
            u.show(),
            _.trigger("onFixImgPosition", {
                url: a,
                trans: e.trans,
                width: i.w,
                height: i.h,
                left: o,
                top: n,
                ctnW: t,
                ctnH: s
            }))
        },
        setHDViewerSize: function(e) {
            v("#js-viewer-container").removeClass("mod-normal");
            var t = e && e.photo
              , e = this.getDisplayInfoByMode(t)
              , t = (e.width,
            e.height,
            v(window).width())
              , e = v(window).height();
            if (w.supportFullScreen() && w.fullScreenChange(function() {
                w.isFullScreenStatus() ? setTimeout(function() {}, 100) : setTimeout(function() {
                    _.trigger("quitHDMode")
                }, 0)
            }),
            w.supportFullScreen() && !w.isFullScreenStatus())
                return v("#js-img-disp").attr("has-show", ""),
                void setTimeout(function() {
                    var e = v(top.document).find("html");
                    w.requestFullScreen(e[0] || e)
                }, 0);
            v("#js-sidebar-ctn").hide(),
            v("#js-thumb-ctn").hide(),
            v("#js-img-disp").attr("has-show", ""),
            v("#js-figure-area a.selected-mode").removeClass("selected-mode"),
            v("#js-figure-area a.js-hd-mode").addClass("selected-mode"),
            v("#js-viewer-main").find(".photo_layer_close").hide(),
            v("#js-hdmode-close").addClass("photo-full-close").show().off(a.click).on(a.click, function() {
                return _.trigger("quitHDMode"),
                !1
            }),
            v("#js-viewer-container").css("padding-top", "0"),
            w.getParameter("inqq") || window.inqq ? (this.imgWrapper.width(t - 20).height(e - 30),
            this.imgWrapper.css({
                marginLeft: 10
            }),
            this.wrapper.show().css({
                width: "100%",
                height: "100%"
            })) : (this.wrapper.show().css({
                width: "100%",
                height: "100%"
            }),
            this.imgWrapper.width(t - 20).height(e)),
            v("#js-viewer-container").height(e)
        },
        setFullViewerSize: function(e) {
            v("#js-viewer-container").removeClass("mod-normal");
            var t = slide.config
              , i = t.viewer
              , o = e && e.photo || slide.photos[slide.index]
              , n = this.getDisplayInfoByMode(o);
            "video" != slide.option.type && "videoandrec" != slide.option.type || (n.width = i.maxViewerWidth,
            n.height = i.maxViewerHeight);
            var s = n.width
              , a = n.height
              , r = v(window).width()
              , d = v(window).height()
              , l = t.sideBar.width
              , p = (w.math.maxmin,
            i.topGap)
              , c = i.fullBottomGap
              , h = i.leftGap
              , o = i.rightGap
              , t = Math.min(r - l - h - o, Math.max(s, i.minViewerWidth))
              , r = Math.max(Math.min(a, d - c - p), i.minViewerHeight)
              , h = e && e.resize;
            !n.width || !n.height || 3e4 < n.height || 3e4 < n.width || (o = w.autoScale({
                maxw: t,
                maxh: r,
                sw: s,
                sh: a
            }),
            r = "video" == slide.option.type || "videoandrec" == slide.option.type ? (e = Math.max(i.minFullViewerWidth / o.w, 1),
            n = Math.max(i.minViewerHeight / o.h, 1),
            n = Math.max(e, n),
            t = o.w * n,
            o.h * n) : (t = Math.max(o.w, i.minFullViewerWidth),
            Math.max(o.h < r && 2.5 < s / a ? r : o.h, i.minViewerHeight)),
            "videoandrec" == slide.option.type ? (v("#js-thumb-ctn").show().css("opacity", 1),
            _.trigger("resizeThumbnails")) : v("#js-thumb-ctn").hide(),
            v("#js-img-disp").attr("has-show", ""),
            v("#js-img-trans").hide(),
            h || (t = Math.max(t, this._lastViewerW),
            r = Math.max(r, this._lastViewerH)),
            this._lastViewerW = t,
            this._lastViewerH = r,
            this.imgWrapper.css({
                marginLeft: 0
            }),
            this.imgWrapper.width(t).height(r),
            this.wrapper.show().css({
                width: t + l - 10,
                height: r
            }),
            v("#_slideView_figure_side").height(r),
            v("#js-sidebar-ctn").height(r - 30),
            v("#js-viewer-layer").height(d),
            slide.wrapper.height(d),
            c = "videoandrec" == slide.option.type ? (d - r - p - c) / 2 + 16 : (d - r - p - c) / 2,
            this.figure.css({
                marginTop: c
            }),
            v("#js-figure-area a.selected-mode").removeClass("selected-mode"),
            v("#js-figure-area a.js-large-mode").addClass("selected-mode"))
        },
        _hideCommentInfo: function() {
            v("#js-comment-ctn").addClass("js-hidden"),
            v("#js-cmt-wrap .handle-tab").addClass("js-hidden")
        },
        _showCommentInfo: function() {
            v("#js-comment-ctn").removeClass("js-hidden"),
            v("#js-cmt-wrap .handle-tab").removeClass("js-hidden")
        },
        setViewerSize: function(e) {
            var t, i, o, n, s, a, r;
            "full" == slide.getMode() && e && e.first || "hd" == slide.getMode() && e && e.first || (v("#js-viewer-container").removeClass("mod-normal"),
            t = v(window).width(),
            i = v(window).height(),
            r = (o = slide.config).viewer,
            n = o.sideBar.width,
            w.math.maxmin,
            s = r.topGap,
            a = r.bottomGap,
            e = Math.max(i - a - s, r.minViewerHeight),
            r = Math.max(Math.min(Math.min(4 * e / 3, r.maxViewerWidth), t - n), r.minViewerWidth),
            !slide.singleImg && 907 != slide.config.appid || (n = 0),
            v("#js-img-disp").attr("has-show", ""),
            !0 !== o.forceShowCloseBtn && (w.getParameter("inqq") || window.inqq) ? (this.imgWrapper.width(0 == n ? t : t - n + 10).height(e - 60).css("margin-left", 0),
            this.wrapper.width(t).height(e).show(),
            v("#_slideView_figure_side").height(e),
            v("#js-sidebar-ctn").height(e + 2),
            v("#js-viewer-layer").height(i),
            slide.wrapper.height(i).css("padding-top", "0")) : (this.imgWrapper.width(r - 25).height(e - 60),
            this.wrapper.width(r + n + 10 - 25).height(e).show(),
            v("#_slideView_figure_side").height(e),
            v("#js-sidebar-ctn").height(e - 30),
            v("#js-viewer-layer").height(i),
            slide.wrapper.height(i)),
            v("#js-thumb-ctn").show().css("opacity", 1),
            _.trigger("resizeThumbnails"),
            this.figure.css({
                marginTop: (i - e - s - a) / 2,
                marginLeft: 0
            }))
        },
        updateCursor: function(t) {
            var e = this
              , i = e.imgCtn.offset()
              , o = e.imgCtn.width();
            1 != slide.photos.length && (e.cursorTimer && clearTimeout(e.cursorTimer),
            e.cursorTimer = setTimeout(function() {
                var e = t.pageX;
                t.pageY;
                e - i.left < o / 4 ? (v("#js-btn-prevPhoto").addClass("arrow-pre-hover"),
                v("#js-btn-nextPhoto").removeClass("arrow-next-hover")) : (v("#js-btn-nextPhoto").addClass("arrow-next-hover"),
                v("#js-btn-prevPhoto").removeClass("arrow-pre-hover"))
            }, 50))
        },
        resetRotate: function(e) {
            this.rotateMatrix = {
                0: [1, 0, 0, 1],
                "-90": [0, -1, 1, 0],
                "-180": [-1, 0, 0, -1],
                "-270": [0, 1, -1, 0]
            },
            this.rotate = 0,
            this.animRotate = 0;
            var t = v("#js-img-disp");
            e && e.hide && t.hasClass("rotate") && t.hide(),
            t.removeClass("rotate"),
            t.css("filter", ""),
            t.css("WebkitTransform", ""),
            t.css("MozTransform", ""),
            t.css("OTransform", ""),
            t.css("msTransform", "")
        },
        rotateLeft: function() {
            var e = this._getDispImg()
              , t = v("#js-img-trans");
            e.is(":hidden") || (t.hide(),
            this.rotate -= 90,
            this.rotate <= -360 && (this.rotate += 360),
            this.animRotate -= 90,
            this.doRotate(e[0], this.rotate, this.animRotate))
        },
        rotateRight: function() {
            var e = this._getDispImg()
              , t = v("#js-img-trans");
            v(".figure_img_loading").length && !v(".figure_img_loading").is(":hidden") || (t.hide(),
            this.rotate += 90,
            0 < this.rotate && (this.rotate -= 360),
            this.animRotate += 90,
            this.rotate % 360 != 0 && "js-img-border" !== e.attr("id") ? (v("#js-img-border").hide(),
            e.show()) : (t = this.getDisplayInfoByMode(),
            e.hide(),
            v("#js-img-disp").attr("src", t.url),
            e = v("#js-img-disp").show()),
            this.doRotate(e[0], this.rotate, this.animRotate))
        },
        doRotate: function(e, t, i) {
            var o = this.rotateMatrix[t]
              , n = e.getAttribute("src")
              , s = slide.imgCache[n] || this.getDisplayInfoByMode()
              , a = s.width
              , r = s.height
              , d = this.imgCtn.width()
              , n = this.imgCtn.height()
              , i = "rotate(" + i + "deg)";
            if (ua.ie && parseInt(ua.ie) < 10 ? e.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + o[0] + ",M21=" + o[1] + ",M12=" + o[2] + ",M22=" + o[3] + ', sizingmethod="auto expand"); ' : (v(e).addClass("rotate"),
            e.style.WebkitTransform = i,
            e.style.MozTransform = i,
            e.style.OTransform = i,
            e.style.msTransform = i),
            v("#js-btn-changeMode").removeClass("js-show-origin").addClass("js-show-normal").attr("title", "点击放大").find("i").removeClass("icon-minify").addClass("icon-magnify"),
            u.hideMap(),
            t % 180 == 0)
                return _.trigger("hideQuanrenInfo"),
                this.fixImgPosition({
                    url: s.url,
                    width: a,
                    height: r,
                    rotate: !0
                }),
                t % 360 == 0 && (v(e).removeClass("rotate"),
                _.trigger("showQuanrenInfo")),
                void this.saveRotate(t);
            _.trigger("hideQuanrenInfo");
            a = w.autoScale({
                maxw: d,
                maxh: n,
                sw: r,
                sh: a
            });
            ua.ie && ua.ie < 10 ? v(e).css({
                width: a.h,
                height: a.w,
                left: (d - a.w) / 2,
                top: (n - a.h) / 2
            }) : v(e).css({
                width: a.h,
                height: a.w,
                left: (d - a.h) / 2,
                top: (n - a.w) / 2
            }),
            this.saveRotate(t)
        },
        saveRotate: function(p) {
            var e, c, t, i;
            !slide.option.saveRotate || (e = slide.photos[slide.index]) && (c = this,
            0 != (t = v("#js-btn-saveRotate")).length && (slide.option.ownerUin,
            (i = QZONE.FP.getQzoneConfig().loginUin) && e.ownerUin == i ? (v("#js-btn-changeMode").removeClass("js-show-origin").addClass("js-show-normal").attr("title", "点击放大").find("i").removeClass("icon-minify").addClass("icon-magnify"),
            u.hideMap(),
            p < 0 && (p = 360 - -1 * p % 360),
            0 != p && p % 360 != 0 ? t.show().off("click").one("click", function(e) {
                if (v(e.target).hasClass("js-save-rotate-ok")) {
                    if (+(l = slide.photos[slide.index]).ownerUin != +QZONE.FP.getQzoneConfig().loginUin)
                        return void QZONE.FP.showMsgbox("您的登录态失效，或者您不是当前照片的主人，请刷新页面再试", 3, 1e3);
                    var l = slide.photos[slide.index]
                      , e = {
                        albumid: slide.topic.topicId,
                        lloc: l.lloc,
                        angle: p,
                        uin: QZONE.FP.getQzoneConfig().loginUin
                    };
                    o.saveRotatePhoto(e).done(function(e) {
                        var t, i, o, n, s, a, r, d;
                        e && 0 == e.code && (t = e.pic,
                        i = l.originHeight,
                        o = l.originWidth,
                        n = w.imgLoad,
                        s = l.lloc,
                        a = slide._oriOption.picKey,
                        r = (r = slide._picKeyMap) || (slide._picKeyMap = {}),
                        d = l.width,
                        e = l.height,
                        l.lloc = t.lloc,
                        r[s] = t.lloc,
                        r[t.lloc] = t.lloc,
                        r[a] = t.lloc,
                        slide.imgCache[l.url] = h,
                        l.pre = t.pre,
                        l.url = t.url,
                        l.width = t.width || (p % 180 != 0 ? e : d),
                        l.height = t.height || (p % 180 != 0 ? d : e),
                        t.origin_url && (slide.imgCache[l.origin] = h,
                        l.origin = t.origin_url,
                        l.originHeight = t.origin_height || (p % 180 == 0 ? i : o),
                        l.originWidth = t.origin_width || (p % 180 == 0 ? o : i),
                        c.setHD({
                            photo: l
                        })),
                        c.showImg(),
                        n(l.pre, function() {
                            v("#js-thumbList-ctn li.on img").attr("src", l.pre),
                            _.trigger("hideImgLoading")
                        })),
                        QZONE.FP.showMsgbox("保存成功", 3, 1e3)
                    }).fail(function(e) {
                        QZONE.FP.showMsgbox("旋转照片保存失败，请稍后再试", 3, 1e3)
                    }).always(function() {
                        t.hide()
                    })
                } else
                    t.hide();
                return !1
            }) : t.hide()) : t.hide()))
        },
        resetImgStyle: function(e) {
            var t = e.css("position")
              , i = e.css("left")
              , o = e.css("top")
              , n = e.css("width")
              , s = e.css("height")
              , a = e.css("display");
            zindex = e.css("zindex"),
            e.attr("style", ""),
            e.css("position", t),
            e.css("left", i),
            e.css("top", o),
            e.css("width", n),
            e.css("height", s),
            e.css("display", a),
            e.css("z-index", zindex)
        },
        changeMode: function() {
            var e, t, i, o, n, s = v("#js-btn-changeMode"), a = this.getDisplayInfoByMode(), r = v("#js-img-trans"), d = this._getDispImg(), l = this.imgCtn, p = {
                url: a.url,
                width: a.width,
                height: a.height,
                changeMode: 1
            };
            s.hasClass("js-show-normal") ? (_.stopGo = !0,
            s.removeClass("js-show-normal").addClass("js-show-origin").attr("title", "点击缩小").find("i").removeClass("icon-magnify").addClass("icon-minify"),
            p.origin = 1,
            this.resetRotate(d),
            p.scale = 1,
            this.fixImgPosition(p),
            r.hide(),
            l.find("#js-img-border").css("cursor", "move"),
            "full" == slide.getMode() && this.imgWrapper.width() <= d.width() && (e = slide.config.sideBar.width,
            t = slide.config.viewer.leftGap,
            i = slide.config.viewer.rightGap,
            v(window).height(),
            n = v(window).width(),
            o = Math.min(d.width(), n - e - t - i),
            this.imgWrapper.width(o),
            this.wrapper.show().css({
                width: o + e - 10
            }),
            this.fixImgPosition(p)),
            "hd" == slide.getMode() && (this.imgWrapper,
            e = slide.config.sideBar.width,
            t = slide.config.viewer.leftGap,
            i = slide.config.viewer.rightGap,
            v(window).height(),
            n = v(window).width(),
            o = Math.min(d.width(), n - e - t - i),
            this.wrapper.show().css({
                width: "100%",
                height: "100%"
            }),
            this.imgWrapper.width(n - 20)),
            t = d.width() || a.width,
            i = d.height() || a.height,
            o = v("#js-img-border"),
            n = d.css("top") || 0,
            2.5 <= i / t ? (d.css("top", 0),
            o.css("top", 0),
            n = 0) : 2.5 <= t / i && (d.css("left", 0),
            o.css("left", 0)),
            u.showMap(a),
            u.setPosition({
                imgW: +a.width,
                imgH: +a.height,
                left: parseInt(d.css("left")),
                top: parseInt(n),
                viewerW: l.width(),
                viewerH: l.height()
            }),
            _.trigger("imgShowOrigin")) : (_.stopGo = !1,
            s.removeClass("js-show-origin").addClass("js-show-normal").attr("title", "点击放大").find("i").removeClass("icon-minify").addClass("icon-magnify"),
            this.fixImgPosition(p),
            l[0].style.cursor = "",
            l.find("#js-img-border").css("cursor", ""),
            u.hideMap(),
            _.trigger("imgShowNormal"))
        },
        checkMode: function(e) {
            e = e || {};
            slide.photos[slide.index];
            var t = this.getDisplayInfoByMode()
              , i = t && t.url
              , o = this.imgCtn.width()
              , n = this.imgCtn.height();
            e.first,
            e.origin;
            t && i ? ("normal" == slide.getMode() && (v("#js-figure-area a.selected-mode").removeClass("selected-mode"),
            v("#js-figure-area a.js-normal-mode").addClass("selected-mode")),
            i = t.width,
            t = t.height,
            !_.playVideo && (o < i || n < t) ? (v("#js-btn-changeMode").show().removeClass("js-show-origin").addClass("js-show-normal").attr("title", "点击放大").find("i").removeClass("icon-minify").addClass("icon-magnify").closest("li").show(),
            2.5 <= t / i && (u.hideMap(),
            _.trigger("enterOriginMode"))) : (v("#js-btn-changeMode").hide().closest("li").hide(),
            u.hideMap())) : v("#js-btn-changeMode").hide()
        },
        doDrag: function(e) {
            var t = v("#js-btn-changeMode")
              , o = this.imgCtn
              , n = this._getDispImg()
              , s = v("#js-img-border")
              , a = n.position()
              , r = o.width()
              , d = o.height()
              , l = n.width()
              , p = n.height();
            t.hasClass("js-show-normal") || w.drag.bind({
                selector: s,
                event: e,
                start: function(e) {
                    var t, i = n.position();
                    o.offset();
                    _ && _.trigger("hideQuanrenInfo"),
                    e.imgStartPos = i,
                    r <= l && p <= d && (t = {
                        xMin: r - l,
                        xMax: 0,
                        yMin: 0,
                        yMax: d - p
                    }),
                    l <= r && d <= p && (t = {
                        xMin: 0,
                        xMax: r - l,
                        yMin: d - p,
                        yMax: 0
                    }),
                    r <= l && d <= p && (t = {
                        xMin: r - l,
                        xMax: 0,
                        yMin: d - p,
                        yMax: 0
                    }),
                    e.range = t
                },
                move: function(e, t) {
                    var i = e.range
                      , e = a.left + t.x
                      , t = a.top + t.y;
                    e < i.xMin ? e = i.xMin : e > i.xMax && (e = i.xMax),
                    t < i.yMin ? t = i.yMin : t > i.yMax && (t = i.yMax),
                    n.css({
                        left: e,
                        top: t
                    }),
                    s.css({
                        left: e,
                        top: t
                    }),
                    u.setPosition({
                        left: e,
                        top: t,
                        imgW: l,
                        imgH: p,
                        viewerW: r,
                        viewerH: d
                    })
                },
                stop: function(e) {
                    _ && _.trigger("imgDragDone")
                }
            })
        },
        setPosition: function(e) {
            var t = this._getDispImg()
              , i = v("#js-img-border")
              , o = e.imgW / t.width()
              , n = -1 * e.yMax
              , s = e.left / o
              , o = e.top / o;
            n == e.top && (o = this.imgCtn.height() - t.height()),
            t.css({
                left: s,
                top: o
            }),
            i.css({
                left: s,
                top: o
            })
        },
        checkIndex: function(e) {
            var t = slide.photos[slide.index];
            if (!t)
                return !0;
            var i = "full" != slide.getMode() && "hd" != slide.getMode() || !t.origin ? t.url : t.origin
              , o = e.replace(/&.*/, "")
              , n = t.origin ? t.origin.replace(/&.*/, "") : h
              , t = t.url ? t.url.replace(/&.*/, "") : h;
            if (o == n || o == t)
                return !0;
            t = w.album.getImgUrl(slide.config.pre, "b");
            return (e = w.album.getImgUrl(e, "b")).replace("&t=5", "").replace("?t=5", "").replace(/&rf=[^&]+/, "").replace(/&bo=[^&]+/, "") == t.replace("&t=5", "").replace("?t=5", "").replace(/&rf=[^&]+/, "").replace(/&bo=[^&]+/, "") || e.replace("&t=5", "").replace("?t=5", "").replace(/&rf=[^&]+/, "").replace(/&bo=[^&]+/, "") == i.replace("&t=5", "").replace("?t=5", "").replace(/&rf=[^&]+/, "").replace(/&bo=[^&]+/, "")
        },
        getDisplayInfoByMode: function(e) {
            var t = e && e.photo || slide.photos[slide.index]
              , i = {
                url: "",
                width: 0,
                height: 0
            }
              , o = slide._picKeyMap
              , e = !1;
            if (o && o[slide.option.picKey] && (e = !0),
            t && t.url)
                i = "full" == slide.getMode() || "hd" == slide.getMode() ? (s = t.origin || t.url,
                a = slide.imgCache[s] || {},
                {
                    url: s,
                    width: t.originWidth || t.width || a.width,
                    height: t.originHeight || t.height || a.height
                }) : (s = t.url,
                a = slide.imgCache[s] || {},
                {
                    url: s,
                    width: t.width || a.width,
                    height: t.height || a.height
                });
            else if (!e)
                if ("normal" == (slide.getMode() || "normal")) {
                    if ((s = w.album.getImgUrl(slide.config.pre, "b")) == slide.config.pre && slide.option.originUrl && "||" !== slide.option.originUrl && (n = (d = slide.option.originUrl.split("|"))[0]) && (s = n),
                    i.url = s,
                    (a = slide.imgCache[s]) && a.width)
                        return i.width = a.width,
                        i.height = a.height,
                        i;
                    (r = PSY.helper.getImageInfoByUrl(s)) && r.bw && (i.width = r.bw),
                    r && r.bh && (i.height = r.bh)
                } else {
                    var n, s = slide.option.originUrl || "";
                    311 != slide.option.appid && (s = ""),
                    (n = (d = s.split("|"))[0]) || (slide.supportWebp && -1 == slide.config.pre.search("t=5") && (slide.config.pre += (-1 < slide.config.pre.indexOf("?") ? "&" : "?") + "t=5"),
                    -1 == slide.config.pre.search("rf=viewer_") && (slide.config.pre += (-1 < slide.config.pre.indexOf("?") ? "&" : "?") + "rf=viewer_" + slide.config.appid + "&from=" + (slide.option.from || "other")),
                    n = w.album.getImgUrl(slide.config.pre, "b"),
                    n = w.album.getImgOriginUrl(n));
                    var a, r, s = d[1], d = d[2];
                    i.url = n,
                    i.width = +s,
                    i.height = +d,
                    i.width && i.height || ((a = slide.imgCache[n]) && a.width ? (i.width = a.width,
                    i.height = a.height) : n && n.indexOf("bo=") && ((r = PSY.helper.getImageInfoByUrl(n)) && 0 != r.width && 0 != r.height || (r = PSY.helper.getImageInfoByUrl(PSY.string.htmlDecode(n))),
                    i.width = r.ow || r.bw,
                    i.height = r.oh || r.bh))
                }
            return "video" != slide.option.type && "videoandrec" != slide.option.type && i && i.url && (0 < i.url.indexOf(".qpic.cn/") || 0 < i.url.indexOf(".photo.store.qq.com/")) && (slide.option.pre = slide.option.pre.replace("/b/", "/a/"),
            i.url = i.url.replace(/&rf=[^&]+/, ""),
            i.url = i.url + "&rf=viewer_" + slide.config.appid,
            slide.option.pre = slide.option.pre.replace(/&rf=[^&]+/, ""),
            slide.option.pre = slide.option.pre + "&rf=viewer_" + slide.config.appid,
            slide.supportWebp && (i.url = i.url.replace("&t=5", ""),
            i.url = i.url + "&t=5",
            slide.option.pre = slide.option.pre.replace("&t=5", ""),
            slide.option.pre = slide.option.pre + "&t=5")),
            slide.option.pre && -1 === slide.option.pre.indexOf("?") && (slide.option.pre = slide.option.pre.replace("&", "?")),
            i.url && -1 === i.url.indexOf("?") && (i.url = i.url.replace("&", "?")),
            2 === PSY.helper.getImageInfoByUrl(i.url).type ? (i.url = i.url.replace("/b/", "/c/"),
            v("#js-btn-play-gif").show(),
            w.stat.pingpv("playGifShow"),
            PSY.oz.returnCodeV4({
                cgi: "/viewer2/gif",
                domain: "photomonitor.qzone.qq.com",
                type: 1,
                code: 0,
                time: 100,
                rate: 10
            }),
            PSY.oz.returnCode({
                flag1: 110425,
                flag2: 1,
                code: 0,
                rate: 10,
                delay: 100
            })) : v("#js-btn-play-gif").hide(),
            i
        },
        resetCmtAreaSize: function(e) {
            e = e || {};
            var t = v("#js-comment-ctn .commentListWrapper");
            return t.hasClass("js-scrollbox") && (e = (e = v("#js-sidebar-ctn").height() - 270) <= 0 ? 100 : e,
            t.css("height", e)),
            !1
        },
        _getDispImg: function() {
            var e, t = v("#js-img-disp");
            return slide && slide.config && slide.config.enableWebpFlash && slide.config.enableWebpFlash() && ((e = v("#js-img-border")).length || (this.imgCtn.append('<div id="js-img-border" style="position:absolute;z-index:4;" class="figure_img_bor"></div>'),
            e = v("#js-img-border")),
            t = e),
            t
        },
        dispose: function() {
            this.unBindMouseWheel(),
            _.stopGo = !1,
            _.playVideo = !1,
            this.imgCtn.css({
                cursor: ""
            }).find("img").attr({
                src: this.blankUrl
            }).css({
                display: "none",
                width: 0,
                height: 0,
                left: 0,
                top: 0
            }),
            v("#js-figure-area a.selected-mode").removeClass("selected-mode"),
            v("#js-btn-changeMode").removeClass("js-show-origin").addClass("js-show-normal").attr("title", "点击放大").find("i").removeClass("icon-minify").addClass("icon-magnify"),
            "hd" == slide.getMode() && slide.setLastMode(),
            v("#js-link-hd").hide(),
            v("#js-hdmode-close").hide().removeClass("photo-full-close"),
            v("#js-hdmode-close").siblings(".photo_layer_close").show(),
            v("#js-viewer-container").css("padding-top", "16px"),
            u.hideMap(),
            v("#js-btn-saveRotate").hide(),
            v("#js-img-disp").attr("has-show", "").hide(),
            this.imgCtn.css({
                cursor: ""
            }),
            this.imgCtn.find("#js-img-border").css("cursor", "")
        }
    }),
    e
}),
define.pack("./tmpl", [], function(require, exports, module) {
    var tmpl = {
        encodeHtml: function(e) {
            return (e + "").replace(/[\x26\x3c\x3e\x27\x22\x60]/g, function(e) {
                return "&#" + e.charCodeAt(0) + ";"
            })
        },
        copyAddress: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {})
                __p.push('<div class="mod-photo-poplayer mod-copy-layer" style="position:static;width:540px;" id="photo-copy-address">\n\t<div class="photo-poplayer-hd" style="display:none">\n\t\t<h4>复制地址</h4>\n\t\t<a href="javascript:void(0)" class="close-poplayer">关闭</a>\n\t</div>\n\t<div class="photo-poplayer-bd">\n\t\t<div class="copy-tabs">\n\t\t\t<a href="javascript:void(0)" class="tab-selected inner-links">内链地址</a>\n\t\t\t<a href="javascript:void(0)" class="out-links">外链地址</a>\n\t\t</div>\n\t\t\x3c!-- 内链地址 --\x3e\n\t\t<div class="mod-innerlinks">\n\t\t\t<p class="panel-link">\n\t\t\t\t<label for="">本页地址：</label>\n\t\t\t\t<input type="text" name="" id="curr-page-url" value="">'),
                window.clipboardData ? __p.push('\t\t\t\t\t\t\t<a href="javascript:void(0)" class="copy-link">复制</a>') : __p.push("\t\t\t\t\t\t\t<span>Ctrl+C复制</span>"),
                __p.push('\t\t\t</p>\n\t\t\t<p class="panel-link">\n\t\t\t\t<label for="">本图地址：</label>\n\t\t\t\t<input type="text" name="" id="curr-pic-link" value="">'),
                window.clipboardData ? __p.push('\t\t\t\t\t\t\t<a href="javascript:void(0)" class="copy-link">复制</a>') : __p.push("\t\t\t\t\t\t\t<span>Ctrl+C复制</span>"),
                __p.push('\t\t\t</p>\n\t\t\t<p class="panel-link">\n\t\t\t\t<label for="">短链地址：</label>\n\t\t\t\t<input type="text" name="" id="curr-short-link" value="">\n\t\t\t\t<a href="javascript:void(0)" class="copy-link" style="display:none;">复制</a>\n\t\t\t\t<a href="javascript:void(0)" id="get-short-link">获取</a>\n\t\t\t\t<span style="display:none;">Ctrl+C复制</span>\n\t\t\t</p>\n\t\t</div>\n\n\t\t\x3c!-- 外链地址 --\x3e\n\t\t<div class="mod-outlinks" style="display:none">\n\t\t\t<div class="link-info">\n\t\t\t\t<p>外链地址(照片大小为：800*533像素，128KB)</p>\n\t\t\t\t<div class="panel-link">\n\t\t\t\t\t<input type="text" name="" id="" value="">'),
                window.clipboardData ? __p.push('\t\t\t\t\t\t\t\t<a href="javascript:void(0)" class="copy-link">复制</a>') : __p.push("\t\t\t\t\t\t\t\t<span>Ctrl+C复制</span>"),
                __p.push('\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="link-info">\n\t\t\t\t<p class="all">任何网站都可以引用您的照片</p>\n\t\t\t\t<p class="specify" style="display:none;">只有指定网站才可以引用您的照片</p>\n\t\t\t\t\x3c!-- 点击的时候，追加类名show-add-setting --\x3e\n\t\t\t\t<a href="javascript:void(0)" class="modify-setting">修改设置<span class="arr-s"><span></span></span></a>\n\t\t\t\t<div class="panel-link">\n\t\t\t\t\t<input type="text" name="" id="" value="">\n\t\t\t\t\t<a href="javascript:void(0)">添加</a>\n\t\t\t\t</div>\n\t\t\t\t<div class="hint-tip">\n\t\t\t\t\t<i class="icon-hint"></i>温馨提醒：设置后，只有您指定的网站，才能引用您的照片。避免其它网站盗用您的外链照片，消耗您的流量。<a href="#">查看更多</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="link-manage">\n\t\t\t\t<div class="compacity">\n\t\t\t\t\t<p>年费黄钻LV7向右两两15G/月，已用9%<a href="javascript:void(0)">详情</a></p>\n\t\t\t\t\t<p>本月流量计算截至5月23日</p>\n\t\t\t\t\t<p>下个月流量计算从5月24日开始到6月23日</p>\n\t\t\t\t</div>\n\t\t\t\t<a href="javascript:void(0)" class="manage-op" style="display:none">管理历史外链</a>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="copylink-error" style="display:none;">\n\t\t\t<p><i class="icon-hint-xl"></i>黄钻用户才能使用外链功能</p>\n\t\t\t<p><a target=\'_blank\' href="http://pay.qq.com/qzone/index.shtml?ch=self&aid=photo.tpwl">开通黄钻，立即享有外链功能!</a>\n\t\t\t</p>\n\t\t</div>\n\t</div>\n\t<div class="photo-poplayer-ft">\n\t\t<a href="javascript:void(0)" class="bt-layer-cancel">关闭</a>\n\t\t\x3c!-- <a href="#" class="bt-layer-confirm">确定</a> --\x3e\n\t</div>\n</div>');
            return __p.join("")
        },
        faceInfo: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {})
                __p.push('\t<h4>圈出好友</h4>\n\t<div class="mod-rec-circle">\n\t\t<div class="face-rec">\n\t\t\t<img src="'),
                _p(data.url),
                __p.push('" width="'),
                _p(data.width),
                __p.push('" height="'),
                _p(data.height),
                __p.push('">\n\t\t</div>\n\t\t<div class="name-rec">\n\t\t\t<div class="face-name j-unconfirm-wrap" style="display: '),
                _p(0 !== data.unconfirm.recommend_infos[0].uin ? "" : "none"),
                __p.push(';">\n\t\t\t\t<div>这是<a href="http://user.qzone.qq.com/'),
                _p(data.unconfirm.targetuin),
                __p.push('/" target="_blank">'),
                _p(data.ubbUin),
                __p.push('</a>吗？</div>\n\t\t\t\t<p class="confirm-face">\n\t\t\t\t\t<a herf="javascript:void(0);" class="j-comfirm-yes"><i class="icon-m icon-yes-m"></i>是</a>\n\t\t\t\t\t<a href="javascript:void(0);" class="j-comfirm-no"><i class="icon-m icon-no-m"></i>不是</a>\n\t\t\t\t</p>\n\t\t\t</div>\n\t\t\t<div class="face-name j-confirm-wrap" style="display:none;">\n\t\t\t\t<div><a class="j-confirm-link" href="http://user.qzone.qq.com/'),
                _p(data.unconfirm.targetuin),
                __p.push('/" target="_blank">'),
                _p(data.ubbUin),
                __p.push('</a></div>\n\t\t\t\t<p class="circle-suc"><i class="icon-m icon-suc-m"></i>标记成功</p>\n\t\t\t</div>\n\t\t\t<div class="status-guide j-unknown-wrap" style="display: '),
                _p(0 === data.unconfirm.recommend_infos[0].uin ? "" : "none"),
                __p.push(';">\n\t\t\t\t\x3c!-- focus到input的时候，给name-input-wrap追加name-input-focus --\x3e\n\t\t\t\t<div class="name-input-wrap j-input-wrap">\n\t\t\t\t\t<p class="name-input"><input type="text" value="这是谁？" style="color: #BDBDBD;"></p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>');
            return __p.join("")
        },
        fullScreen: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {})
                __p.push('<div id="js-fullscreen-wrapper" class="js-fullscreen-wrapper">\n\t<div style="" id="photo-fullscreen-layer" class="js-fullscreen-layer-transition">\n\t\t<div class="js-fullscreen-cont js-fullscreen-cont-transition" style="">\n\t\t\t<div class="js-fullscreen-img" style="">\n\t\t\t\t<img />\n\t\t\t</div>\n\t\t</div>\n\t</div>'),
                __p.push('\t<div class="lightbox-op-bar" id="js-autoplay" style="position:absolute;z-index:5;display:none">\n\t\t<div class="lightbox-side">\n\t\t\t<a href="javascript:void(0)" class="js-resume-fullscreen" style="display:none;" title="播放"><i class="op-play"></i><span>播放</span></a>\n\t\t\t<a href="javascript:void(0)" class="js-pause-fullscreen" title="暂停"><i class="op-pause"></i><span>暂停</span></a>\n\t\t</div>\n\t\t<div class="lightbox-exit">\n\t\t\t<a href="javascript:void(0)" class="js-exit-fullscreen" title="退出幻灯片"><i class="op-exit">退出幻灯片</i></a>\n\t\t</div>\n\t</div>'),
                __p.push("</div>\n");
            return __p.join("")
        },
        infoBar: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {}) {
                __p.push("\t");
                var photo = data.photo, picKey = photo.picKey || photo.id, desc = data.desc, descTitle = data.descTitle, nameTitle = data.nameTitle, name = photo.name, topicName = photo.topicName || "", shootTime = photo.shootTime && util.formatDate(1e3 * photo.shootTime) || "", poiName = escHTML(photo.poiName), cameraType = escHTML(photo.cameraType), uploadTime = data.uploadTime, sizeStr = photo.width + "*" + photo.height, isMobUpload = 52 == photo.platformId || 50 == photo.platformId, albumLink = "http://user.qzone.qq.com/" + photo.ownerUin + "/photo/" + photo.topicId, hanziReg = /[\u4E00-\u9FA5]/g, undefined, tmpTopicName, uin, tid, t1_source;
                photo.origin && (sizeStr = photo.originWidth + "*" + photo.originHeight),
                hanziReg.test(name) || (name = ""),
                __p.push('\t\t\n\t\t\x3c!-- 追加show-figure-info，显示浮出层 --\x3e\n\t\t<div class="figure-info">\n\t\t\t<div class="device-info">'),
                4 == slide.config.appid ? (__p.push("\t"),
                10 < topicName.length ? (tmpTopicName = escHTML(topicName.substr(0, 10) + "..."),
                __p.push('<a href="'),
                _p(albumLink),
                __p.push('" class="js-album-name" target="_blank" title="'),
                _p(escHTML(topicName)),
                __p.push('">'),
                _p("《" + tmpTopicName + "》")) : (__p.push('<a href="'),
                _p(albumLink),
                __p.push('" class="js-album-name" target="_blank">'),
                _p("《" + escHTML(topicName) + "》")),
                __p.push("</a>"),
                __p.push("\t\t\t\t\t"),
                slide.config.type && "iphoto" == slide.config.type || (__p.push('\t\t\t\t\t<span title="'),
                _p(slide.picPosInTotal + slide.index + 1 - slide._firstPhotoIndex),
                __p.push("/"),
                _p(slide.picTotal),
                __p.push('">'),
                _p(slide.picPosInTotal + slide.index + 1 - slide._firstPhotoIndex),
                __p.push("/"),
                _p(slide.picTotal),
                __p.push("</span>")),
                __p.push("\t\t\t\t\t")) : 311 == slide.config.appid && (uin = photo.ownerUin,
                tid = photo.tid,
                t1_source = photo.t1_source,
                __p.push('\t\t\t\t\t\t<a target="_blank" href="http://user.qzone.qq.com/'),
                _p(uin),
                __p.push("/mood/"),
                _p(tid),
                __p.push("."),
                _p(t1_source),
                __p.push('" class="js-expand">《说说相册》</a>')),
                __p.push('\t\t\t\t\n\t\t\t\t\n\t\t\t</div>\n\t\t\t<div class="device-info-edit"></div>\n\t\t\t<div class="js-pop-exif mod-exif-info">\n\t\t\t\t\n\t\t\t</div>\n\t\t\t\n\t\t\t<div class="exif-loading mod-exif-info" style="display:none">\n\t\t\t\t<img src="http://qzs.qq.com/qzone_v6/img/photo/loading_16x16.gif" style="padding:2px"/>\n\t\t\t</div>\n\t\t\t')
            }
            return __p.join("")
        },
        exifInfo: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {}) {
                __p.push("\t");
                var photo = data.photo, exif = data.exif, sizeStr = photo.width + "*" + photo.height, cubeB = photo.photocubage ? util.formatSize(photo.photocubage) : "", cube = photo.origin_size ? util.formatSize(photo.origin_size) : cubeB, clcls = "", type = photo.phototype, poiName = escHTML(photo.poiName || ""), extName = "JPEG", listStyle = "", cameraType = escHTML(photo.cameraType || ""), topic = data.topic || {}, ownerUin = photo.ownerUin || topic.ownerUin, loginUin = data.loginUin, bitmap = exif.bitmap || topic.bitmap || "10000000", showExif = "1" === bitmap.charAt(0) && "0" === bitmap.charAt(3), undefined;
                if (photo.video_info)
                    extName = "VIDEO",
                    sizeStr = (photo.video_info.cover_width || photo.width) + "*" + (photo.video_info.cover_height || photo.height),
                    cube = cubeB = "";
                else {
                    switch (type) {
                    case 1:
                        extName = "JPEG";
                        break;
                    case 2:
                        extName = "GIF";
                        break;
                    case 3:
                        extName = "PNG";
                        break;
                    case 4:
                        extName = "BMP";
                        break;
                    case 5:
                        extName = "JPEG"
                    }
                    photo.origin && (sizeStr = photo.originWidth + "*" + photo.originHeight)
                }
                switch (exif.meteringMode) {
                case "平均测光":
                    clcls = "icon-average-metering";
                    break;
                case "中央重点平均测光":
                    clcls = "icon-center-metering";
                    break;
                case "点测光":
                    clcls = "icon-point-metering";
                    break;
                case "局部测光":
                    clcls = "icon-area-metering"
                }
                exif.iso || exif.focalLength || exif.exposureCompensation || exif.fnumber || exif.exposureTime || (listStyle = "display:none;"),
                __p.push('\t<div class="exif-info-bd">\n\t\t<p>'),
                _p(escHTML(exif.model) || cameraType || ""),
                __p.push("</p>\n\t\t<p>"),
                _p(sizeStr),
                __p.push(" "),
                _p(cube),
                __p.push(" "),
                _p(exif.originalTime.substr(0, 10)),
                __p.push(" "),
                poiName && __p.push('\t\t\t\t<i class="icon-s icon-place-s"></i>'),
                __p.push('\t\t</p>\n\t\t<div class="photo-mode"><i class="'),
                _p(clcls),
                __p.push('"></i><span>'),
                _p(extName),
                __p.push("</span></div>"),
                exif && !showExif && ownerUin == loginUin && __p.push('\t\t\t<div class="photo-mode photo-mode-only-self" style="margin-top: 45px;right: 3px;"><span style="background:none;font-weight: normal; color:#333;">(仅主人可见)</span></div>'),
                __p.push('\t</div>\n\t<div class="exif-info-ft" style="'),
                _p(listStyle),
                __p.push('">\n\t\t<ul>'),
                exif.iso ? (__p.push("\t\t\t\t\t<li>ISO "),
                _p(exif.iso),
                __p.push("</li>")) : __p.push("\t\t\t\t\t<li>-</li>"),
                __p.push("\t\t\t\n\t\t\t<li>"),
                _p(exif.focalLength || "-"),
                __p.push("</li>"),
                exif.exposureCompensation ? (__p.push("\t\t\t\t\t<li>"),
                _p(exif.exposureCompensation),
                __p.push("</li>")) : __p.push("\t\t\t\t\t<li>-</li>"),
                __p.push("\t\t\t\n\t\t\t<li>"),
                _p(exif.fnumber || "-"),
                __p.push("</li>\n\t\t\t<li>"),
                _p(exif.exposureTime.replace("sec", "") || "-"),
                __p.push('</li>\n\t\t</ul>\n\t</div>\n\t<span class="mod-arr mod-arr-t"><span></span></span>')
            }
            return __p.join("")
        },
        info_202: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {}) {
                var photo = data.photo, uin = photo.ownerUin, nick = photo.ownerName || uin, descHtml = photo.descHtml || "", title = photo.title || "查看原文", summary = photo.summary || "", timeStr = photo.timeStr, shareLink = photo.shareLink, isFakeData = photo.isFakeData, userLink, logo;
                undefined,
                202 != slide.option.appid || "album" != slide.option.type && "photo" != slide.option.type || !slide.shareInfo || (uin = slide.shareInfo.shareUser.uin,
                nick = slide.shareInfo.shareUser.nick || uin,
                descHtml = PSY.ubb.ubb2html(slide.shareInfo.Description, {
                    formatTopic: !0,
                    showAt: !0,
                    formatUrl: !0
                }),
                title = slide.shareInfo.Title,
                summary = slide.shareInfo.Summary,
                timeStr = slide.util.formatTime2(slide.shareInfo.AddTime),
                shareLink = slide.shareInfo.Url),
                "videoandrec" == slide.option.type && isFakeData && (descHtml = "该" + (photo.videoTypeName || "视频") + "已删除或设有权限，不支持互动"),
                userLink = "http://user.qzone.qq.com/" + uin,
                logo = "http://qlogo" + (uin % 4 + 1) + ".store.qq.com/qzone/" + uin + "/" + uin + "/50",
                isFakeData ? (__p.push('\t<div class="figure_description c_tx2" id="js-description" style="height:85px;overflow:hidden;display:none;">\n\t\t<div id="js-description-inner">'),
                _p(descHtml),
                __p.push("\t\t</div>\n\t</div>")) : (__p.push('\t<div class="clear user" id="_slideView_userinfo" style="height:40px">\n\t\t<p class="user-img">\n\t\t\t<a class="js-report-click" data-tag="head" target="_blank" href="'),
                _p(userLink),
                __p.push('">\n\t\t\t\t<img width="40" height="40" src="'),
                _p(logo),
                __p.push('">\n\t\t\t</a>\n\t\t</p>\n\t\t<div class="user-photo-details">'),
                "videoandrec" == slide.option.type ? (__p.push('\t\t\t\t<p class="c_tx3">\n                    <a class="js-report-click" data-tag="nickname" href="'),
                _p(userLink),
                __p.push('" target="_blank">'),
                _p(PSY.ubb.ubb2html(nick, {
                    from: "nick"
                })),
                __p.push('</a>\n                    <a href="http://page.qq.com" target="_blank" title="腾讯认证" style="display:'),
                _p(photo.isFamous ? "" : "none"),
                __p.push(';"><i class="icon-vtag"></i></a>\n                    分享\n                </p>\n                <div class="photo-base-info">'),
                photo.isFakeFirstData || (__p.push('                    <p class="c_tx3"><span>'),
                _p(timeStr),
                __p.push("</span><span>　</span><span>浏览"),
                _p(util.formatNum(photo.visitorData && photo.visitorData.view_count || 0)),
                __p.push("</span></p>")),
                __p.push("                </div>")) : (__p.push('\t\t\t\t<p class="c_tx3">\n                    <a class="js-report-click" data-tag="nickname" href="'),
                _p(userLink),
                __p.push('" target="_blank">'),
                _p(PSY.ubb.ubb2html(nick, {
                    from: "nick"
                })),
                __p.push('</a>\n                    分享\n                </p>\n                <div class="photo-base-info">\n                    <p class="c_tx3">'),
                _p(timeStr),
                __p.push("</p>\n                </div>")),
                __p.push("\t\t</div>"),
                "videoandrec" == slide.option.type && (__p.push('\t\t\t\x3c!-- 关注成功后添加[.btn-follow-done] --\x3e\n\t\t\t<a href="javascript:;" class="btn-follow '),
                _p(photo.hasFollowed ? "btn-follow-done" : ""),
                __p.push(' js-btn-follow" style="display:'),
                _p(photo.needShowFollow ? "" : "none"),
                __p.push(';">'),
                _p(photo.hasFollowed ? "已关注" : "关注"),
                __p.push("</a>")),
                __p.push('\t</div>\n\t<div class="figure_description c_tx2" id="js-description" style="height:85px;overflow:hidden;display:none;">\n\t\t<div id="js-description-inner">'),
                _p(descHtml),
                __p.push("\t\t\t"),
                "videoandrec" != slide.option.type && (__p.push('\t\t\t\t<p style="height:22px; overflow:hidden">\n\t\t\t\t\t<a href="'),
                _p(shareLink),
                __p.push('" target="_blank">'),
                _p(title),
                __p.push("</a>\n\t\t\t\t</p>"),
                summary && (__p.push('\t\t\t\t\t<p style="height:22px; overflow:hidden">'),
                _p(summary),
                __p.push("\t\t\t\t\t</p>")),
                __p.push("\t\t\t")),
                __p.push('\t\t</div>\n\t</div>\n\t<p id="js-expandDesc" class="openthis" style="display:none">\n\t\t<a href="javascript:void(0)" class="js-expand">展开原文</a>\n\t</p>')),
                __p.push("")
            }
            return __p.join("")
        },
        info_311: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {}) {
                var util = data.util, photo = data.photo, uin = photo.ownerUin, userLink = "http://user.qzone.qq.com/" + uin, nick = escHTML(photo.ownerName || uin), logo = "http://qlogo" + (uin % 4 + 1) + ".store.qq.com/qzone/" + uin + "/" + uin + "/50", descHtml = photo.descHtml, timeStr = photo.timeStr, rtMood = photo.rtMood, tid = photo.tid, name = escHTML(photo.name), t1_source = photo.t1_source, loginUin = data.loginUin, isFakeData = photo.isFakeData, undefined;
                "videoandrec" == slide.option.type && isFakeData && (descHtml = "该" + (photo.videoTypeName || "视频") + "已删除或设有权限，不支持互动"),
                isFakeData ? (__p.push('\t<div class="figure_description c_tx2" id="js-description" style="height:85px;overflow:hidden">\n\t\t<div id="js-description-inner">'),
                _p(descHtml),
                __p.push("\t\t</div>\n\t</div>")) : (__p.push('\t<div class="clear user" id="_slideView_userinfo" style="height:40px">\n\t\t<p class="user-img">\n\t\t\t<a class="js-report-click" data-tag="head" target="_blank" href="'),
                _p(userLink),
                __p.push('">\n\t\t\t\t<img width="40" height="40" src="'),
                _p(logo),
                __p.push('">\n\t\t\t</a>\n\t\t</p>\n\t\t<div class="user-photo-details">'),
                "comment" == slide.option.type ? (__p.push('\t\t\t\t\t\t<p class="c_tx3">\n\t\t\t\t\t\t   <a href="'),
                _p(userLink),
                __p.push('" target="_blank">'),
                _p(PSY.ubb.ubb2html(nick, {
                    from: "nick"
                })),
                __p.push('</a>  评论\n\t\t\t\t\t\t</p>\n\t\t\t\t\t\t<div class="photo-base-info">\n\t\t\t\t\t\t\t<p class="c_tx3">'),
                _p(timeStr),
                __p.push('<a href="javascript:" id="js-btn-exif"><i class="icon-s icon-device-s"></i></a></p>\n\t\t\t\t\t\t\t<div class="mod-exif-info">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>')) : "video" == slide.option.type ? (__p.push('\t\t\t\t\t\t<p class="c_tx3">\n\t\t\t\t\t\t\t<a class="js-report-click" data-tag="nickname" href="'),
                _p(userLink),
                __p.push('" target="_blank">'),
                _p(PSY.ubb.ubb2html(nick, {
                    from: "nick"
                })),
                __p.push('</a>\n\t\t\t\t\t\t</p>\n\t\t\t\t\t\t<div class="photo-base-info">\n\t\t\t\t\t\t\t<p class="c_tx3">'),
                _p(timeStr),
                __p.push("</p>\n\t\t\t\t\t\t</div>")) : "videoandrec" == slide.option.type ? (__p.push('\t\t\t\t\t\t<p class="c_tx3">\n\t\t\t\t\t\t\t<a class="js-report-click" data-tag="nickname" href="'),
                _p(userLink),
                __p.push('" target="_blank">'),
                _p(PSY.ubb.ubb2html(nick, {
                    from: "nick"
                })),
                __p.push('</a>\n\t\t\t\t\t\t\t<a href="http://page.qq.com" target="_blank" title="腾讯认证" style="display:'),
                _p(photo.isFamous ? "" : "none"),
                __p.push(';"><i class="icon-vtag"></i></a>\n\t\t\t\t\t\t</p>\n\t\t\t\t\t\t<div class="photo-base-info">'),
                photo.isFakeFirstData || (__p.push('\t\t\t\t\t\t\t<p class="c_tx3"><span>'),
                _p(timeStr),
                __p.push("</span><span>　</span><span>浏览"),
                _p(util.formatNum(photo.visitorData && photo.visitorData.view_count || 0)),
                __p.push("</span></p>")),
                __p.push("\t\t\t\t\t\t</div>")) : (__p.push('\t\t\t\t\t\t<p class="c_tx3">\n\t\t\t\t\t\t   <a class="js-report-click" data-tag="nickname" href="'),
                _p(userLink),
                __p.push('" target="_blank">'),
                _p(PSY.ubb.ubb2html(nick, {
                    from: "nick"
                })),
                __p.push("</a>\n\t\t\t\t\t\t</p>"),
                rtMood && __p.push("\t\t\t\t\t\t\t&nbsp;转发"),
                __p.push('\t\t\t\t\t\t<div class="photo-base-info">\n\t\t\t\t\t\t\t<p class="c_tx3">'),
                _p(timeStr),
                __p.push('<a href="javascript:" id="js-btn-exif"><i class="icon-s icon-device-s"></i></a></p>\n\t\t\t\t\t\t\t<div class="mod-exif-info">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>')),
                __p.push("\t\t</div>"),
                "videoandrec" == slide.option.type && (__p.push('\t\t\t\x3c!-- 关注成功后添加[.btn-follow-done] --\x3e\n\t\t\t<a href="javascript:;" class="btn-follow '),
                _p(photo.hasFollowed ? "btn-follow-done" : ""),
                __p.push(' js-btn-follow" style="display:'),
                _p(photo.needShowFollow ? "" : "none"),
                __p.push(';">'),
                _p(photo.hasFollowed ? "已关注" : "关注"),
                __p.push("</a>")),
                __p.push('\t</div>\n\t<div class="figure_description c_tx2" id="js-description" style="height:85px;overflow:hidden">\n\t\t<div id="js-description-inner">'),
                _p(descHtml),
                __p.push('\t\t</div>\n\t</div>\n\t<p id="js-expandDesc" class="openthis js-btn-expand" style="display:none">\n\t\t<a href="javascript:void(0)" class="js-expand">展开原文</a>\n\t</p>\n\t<p id="js-foldDesc" class="openthis js-btn-fold" style="display:none">\n\t\t<a href="javascript:void(0)" class="js-fold">收起原文</a>\n\t</p>\n\t\x3c!--照片圈人+POI列表区S--\x3e\n\t<div class="mod-circle">\n\t\t<p id="js-btn-quanren-list">\n\t\t\t<span id="tagging_list" data-clear="false" style="display:'),
                _p(photo.faceList && photo.faceList.length ? "" : "none"),
                __p.push(';">'),
                _p(tmpl.tagged_item_inViewer_list({
                    photo: photo,
                    faceList: photo.faceList,
                    loginUin: loginUin
                })),
                __p.push('\t\t\t</span>\n\t\t\t<span id="js-btn-poi">'),
                _p(tmpl.info_lbs({
                    photo: photo
                })),
                __p.push("</span>\n\t\t</p>\n\t</div>")),
                __p.push("")
            }
            return __p.join("")
        },
        info_4: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {}) {
                var photo = data.photo, uin = photo.ownerUin, userLink = "http://user.qzone.qq.com/" + uin, nick = escHTML(photo.ownerName || uin), logo = "http://qlogo" + (uin % 4 + 1) + ".store.qq.com/qzone/" + uin + "/" + uin + "/50", desc = photo.desc, timeStr = photo.timeStr, aid = photo.albumId || photo.topicId, albumName = escHTML(photo.topicName), albumLink = photo.albumLink, name = escHTML(photo.name), descHtml = photo.descHtml, loginUin = data.loginUin, ownerUin = data.ownerUin, type = slide.option.type, isFakeData = photo.isFakeData, undefined;
                if ("videoandrec" != slide.option.type)
                    try {
                        "number" == typeof timeStr && (timeStr *= 1e3),
                        timeStr = PSY.date.formatDate(slide.util.getNewDate(timeStr), "YYYY年MM月DD日 hh:mm")
                    } catch (e) {
                        timeStr = photo.timeStr
                    }
                "videoandrec" == slide.option.type && isFakeData && (descHtml = "该" + (photo.videoTypeName || "视频") + "已删除或设有权限，不支持互动"),
                isFakeData ? (__p.push('\t<div class="figure_description c_tx2" id="js-description" style="height:85px;overflow:hidden">\n\t\t<div id="js-description-inner">'),
                _p(descHtml),
                __p.push("\t\t</div>\n\t</div>")) : (__p.push('\t<div class="clear user" id="_slideView_userinfo" style="height:40px">\n\t\t<p class="user-img">\n\t\t\t<a class="js-report-click" data-tag="head" target="_blank" href="'),
                _p(userLink),
                __p.push('">\n\t\t\t\t<img width="40" height="40" src="'),
                _p(logo),
                __p.push('">\n\t\t\t</a>\n\t\t</p>\n\t\t<div class="user-photo-details">'),
                "comment" == type ? (__p.push('\t\t\t\t\t\t<p class="c_tx3">\n\t\t\t\t\t\t   <a href="'),
                _p(userLink),
                __p.push('" target="_blank">'),
                _p(PSY.ubb.ubb2html(nick, {
                    from: "nick"
                })),
                __p.push('</a>  评论\n\t\t\t\t\t\t</p>\n\t\t\t\t\t\t<div class="photo-base-info">\n\t\t\t\t\t\t\t<p class="c_tx3">'),
                _p(timeStr),
                __p.push('<a href="javascript:" id="js-btn-exif"><i class="icon-s icon-device-s"></i></a></p>\n\t\t\t\t\t\t\t<div class="mod-exif-info">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>')) : "videoandrec" == type ? (__p.push('\t\t\t\t\t\t<p class="c_tx3">\n\t\t\t\t\t\t\t<a class="js-report-click" data-tag="nickname" href="'),
                _p(userLink),
                __p.push('" target="_blank">'),
                _p(PSY.ubb.ubb2html(nick, {
                    from: "nick"
                })),
                __p.push('</a>\n\t\t\t\t\t\t\t<a href="http://page.qq.com" target="_blank" title="腾讯认证" style="display:'),
                _p(photo.isFamous ? "" : "none"),
                __p.push(';"><i class="icon-vtag"></i></a>\n\t\t\t\t\t\t</p>\n\t\t\t\t\t\t<div class="photo-base-info">'),
                photo.isFakeFirstData || (__p.push('\t\t\t\t\t\t\t<p class="c_tx3"><span>'),
                _p(timeStr),
                __p.push("</span><span>　</span><span>浏览"),
                _p(util.formatNum(photo.visitorData && photo.visitorData.view_count || 0)),
                __p.push("</span></p>")),
                __p.push("\t\t\t\t\t\t</div>")) : (__p.push('\t\t\t\t\t\t<p class="c_tx3"><a class="js-report-click" data-tag="nickname" href="'),
                _p(userLink),
                __p.push('" target="_blank">'),
                _p(PSY.ubb.ubb2html(nick, {
                    from: "nick"
                })),
                __p.push('</a> 的 \n\t\t\t\t\t\t\t<span id="js-photo-name" title="'),
                _p(name),
                __p.push('">'),
                _p(name),
                __p.push('</span>\n\t\t\t\t\t\t</p>\n\t\t\t\t\t\t<div class="photo-base-info">\n\t\t\t\t\t\t\t<p class="c_tx3">'),
                _p(timeStr),
                __p.push('<a href="javascript:" id="js-btn-exif"><i class="icon-s icon-device-s"></i></a></p>\n\t\t\t\t\t\t\t<div class="mod-exif-info">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>')),
                __p.push('\t\t\t\n\t\t</div>\n\t</div>\n\t<div class="figure_description c_tx2" id="js-description" style="overflow:hidden;">\n\t\t<div id="js-description-inner">'),
                _p(descHtml),
                __p.push("\t\t\t"),
                photo.isFakeFirstData || __p.push('\t\t\t<a href="javascript:;" id="js-add-desc">添加描述</a>'),
                __p.push('\t\t</div>\n\t</div>\n\t\n\t<p id="js-expandDesc" class="openthis js-btn-expand" style="display:none">\n\t\t<a href="javascript:void(0)" class="js-expand">展开原文</a>\n\t</p>\n\t\n\t<p id="js-foldDesc" class="openthis js-btn-fold" style="display:none">\n\t\t<a href="javascript:void(0)" class="js-fold">收起原文</a>\n\t</p>\n\t\n\t\x3c!--照片圈人+POI列表区S--\x3e\n\t<div class="mod-circle">\n\t\t<p id="js-btn-quanren-list">\n\t\t\t<span id="tagging_list" data-clear="false" style="display:'),
                _p(photo.faceList && photo.faceList.length ? "" : "none"),
                __p.push(';">'),
                _p(tmpl.tagged_item_inViewer_list({
                    photo: photo,
                    faceList: photo.faceList,
                    loginUin: loginUin
                })),
                __p.push('\t\t\t</span>\n\t\t\t<span id="js-btn-poi">'),
                _p(tmpl.info_lbs({
                    photo: photo
                })),
                __p.push("</span>\n\t\t</p>\n\t</div>")),
                __p.push("")
            }
            return __p.join("")
        },
        info_421: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {}) {
                __p.push("\t");
                var photo = data.photo, uin = photo.ownerUin, userLink = "http://user.qzone.qq.com/" + uin, nick = escHTML(photo.ownerName || uin), logo = PSY.user.qqAvatar(uin), desc = photo.desc, timeStr = photo.timeStr, aid = photo.albumId || photo.topicId, albumName = escHTML(photo.topicName), albumLink = photo.albumLink, name = escHTML(photo.name || "照片"), descHtml = photo.descHtml, undefined;
                try {
                    "number" == typeof timeStr && (timeStr *= 1e3),
                    timeStr = PSY.date.formatDate(slide.util.getNewDate(timeStr), "YYYY年MM月DD日 hh:mm")
                } catch (e) {
                    timeStr = photo.timeStr
                }
                __p.push('\t<div class="clear user" id="_slideView_userinfo" style="height:40px">\n\t\t<p class="user-img">\n\t\t\t<a class="js-report-click" data-tag="head" target="_blank" href="'),
                _p(userLink),
                __p.push('">\n\t\t\t\t<img width="40" height="40" src="'),
                _p(logo),
                __p.push('">\n\t\t\t</a>\n\t\t</p>\n\t\t<div class="user-photo-details">\n\t\t\t<p class="c_tx3"><a class="js-report-click" data-tag="nickname" href="'),
                _p(userLink),
                __p.push('" target="_blank">'),
                _p(PSY.ubb.ubb2html(nick, {
                    from: "nick"
                })),
                __p.push('</a> 的 \n                <span id="js-photo-name" title="'),
                _p(name),
                __p.push('">'),
                _p(name),
                __p.push('</span>\n            </p>\n            <div class="photo-base-info">\n                <p class="c_tx3">'),
                _p(timeStr),
                __p.push('<a href="javascript:" id="js-btn-exif"><i class="icon-s icon-device-s"></i></a></p>\n                <div class="mod-exif-info">\n                </div>\n            </div>\n\t\t</div>\n\t</div>\n\t<div class="figure_description c_tx2" id="js-description" style="overflow:hidden;">\n\t\t<div id="js-description-inner">'),
                _p(descHtml),
                __p.push('\t\t\t<a href="javascript:;" id="js-add-desc">添加描述</a>\n\t\t</div>\n\t</div>\n\t<p id="js-expandDesc" class="openthis js-btn-expand" style="display:none">\n\t\t<a href="javascript:void(0)" class="js-expand">展开原文</a>\n\t</p>\n\t<p id="js-foldDesc" class="openthis js-btn-fold" style="display:none">\n        <a href="javascript:void(0)" class="js-fold">收起原文</a>\n    </p>')
            }
            return __p.join("")
        },
        info_lbs: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {}) {
                var photo = data.photo || {}, lbs = photo.shootGeo && photo.shootGeo.idname ? photo.shootGeo : photo.lbs, i;
                lbs && lbs.idname && (__p.push('<span class="place-wrap">在<a href="javascript:void(0)" class="place-name" data-pos="'),
                _p(lbs.pos_x),
                __p.push(","),
                _p(lbs.pos_y),
                __p.push('" title="点击查看地图">'),
                _p(escHTML(lbs.idname)),
                __p.push("</a></span>")),
                __p.push("")
            }
            return __p.join("")
        },
        info_lbs_map: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {}) {
                var lbs = data.lbs || {}
                  , offset = data.offset || {};
                __p.push('\n<div class="photo-place-info" id="js-info-lbs-map" style="top: '),
                _p(offset.top || 0),
                __p.push("px; left: "),
                _p(offset.left || 0),
                __p.push("px; z-index:"),
                _p(offset.zIndex || ""),
                __p.push('">\n\t<div class="place-info-detail"><iframe scrolling="no" frameBorder="0" allowTransparency="" style="width: 300px;height:200px; border: 0 none;" src="http://qzs.qq.com/qzone/app/controls/map/tips.html#posx='),
                _p(lbs.pos_x),
                __p.push("&posy="),
                _p(lbs.pos_y),
                __p.push('"></iframe></div>\n\t<span class="place-arr-wrap"><span class="place-arr"></span></span>\n</div>')
            }
            return __p.join("")
        },
        music: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {}) {
                __p.push("\t");
                var size = data.size, id = data.id, time = data.time, undefined;
                __p.push('\t<div class="qz_shuoshuo_audio js_play_record qz_shuoshuo_audio_'),
                _p(size),
                __p.push(' js-voice-hover bor_bg6" data-id="'),
                _p(id),
                __p.push('" data-time="'),
                _p(time),
                __p.push('" title="播放语音">\n\t\t<div class="shuoshuo_audio_inner bg_bor2" style="width:0%">\n\t\t\t<div class="audio_icon">\n\t\t\t\t<b class="icon_play bor_bg6"></b><b class="icon_pause"><span class="icon_pause_left bor_bg6"></span><span class="icon_pause_right bor_bg6"></span></b>\n\t\t\t</div>\n\t\t\t<div class="audio_time">\n\t\t\t\t<span class="c_tx2">'),
                _p(time),
                __p.push('"</span>\n\t\t\t</div>\t\n\t\t</div>\n\t</div>')
            }
            return __p.join("")
        },
        outLinks: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {}) {
                var photoData = data
                  , d = arguments[1]
                  , total = d.total
                  , hasUsed = d.count ? Math.max(Math.round(d.count / (1024 * d.total * 1024 * 1024) * 1e4) / 100, .01) : 0
                  , statTime = new Date(1e3 * d.stattime)
                  , nextStartTime = new Date(1e3 * d.stattime + 864e5)
                  , endTime = new Date(Math.min(1e3 * d.stattime + 26784e5, 1e3 * d.closetime))
                  , domains = d.domains
                  , hasSetDomain = 0;
                domains && domains[0] && (hasSetDomain = 1);
                var title = QZONE.FP.isUserVIPExpress() ? "年费黄钻" : "黄钻", i;
                for (i in 1 <= QZONE.FP.getUserVIPLevel() && (title += "LV" + QZONE.FP.getUserVIPLevel()),
                __p.push('<div class="link-info">\n\t<p>外链地址(照片大小为：'),
                _p(photoData.width),
                __p.push("*"),
                _p(photoData.height),
                __p.push("像素，"),
                _p(Math.ceil(photoData.photocubage / 1e3) || 0),
                __p.push('KB)</p>\n\t<div class="panel-link">\n\t\t<input type="text" name="" id="curr-outlink" value="">'),
                window.clipboardData ? __p.push('\t\t\t\t<a href="javascript:void(0)" class="copy-link">复制</a>') : __p.push("\t\t\t\t<span>Ctrl+C复制</span>"),
                __p.push('\t</div>\n</div>\n<div class="link-info">'),
                hasSetDomain ? __p.push("<p>只有指定网站才可以引用您的照片</p>") : __p.push("<p>任何网站都可以引用您的照片</p>"),
                __p.push('\t\x3c!-- 点击的时候，追加类名show-add-setting --\x3e\n\t<a href="javascript:void(0)" class="modify-setting">修改设置<span class="arr-s"><span></span></span></a>\n\t<div class="panel-link" style="display:none">\n\t\t<input type="text" name="" id="add-outlink-input" value="">\n\t\t<a href="javascript:void(0)" id="add-outlink-btn">添加</a>\n\t</div>\n\t<div class="panel-link panel-link-lists" style="display:none">\n\t\t<ul>'),
                domains) {
                    var curr = domains[i];
                    curr.domain && (__p.push('\t\t\t\t\t<li>\n\t\t\t\t\t\t<div class="single-link-show">\n\t\t\t\t\t\t\t<p class="single-link-info">'),
                    _p(curr.domain),
                    __p.push('</p>\n\t\t\t\t\t\t\t<div class="single-link-op">\n\t\t\t\t\t\t\t\t<a href="javascript:void(0)" title="编辑" class="edit-outlink">编辑</a>\n\t\t\t\t\t\t\t\t<span>|</span>\n\t\t\t\t\t\t\t\t<a href="javascript:void(0)" title="删除" class="del-outlink">删除</a>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>'))
                }
                __p.push('\t\t</ul>\n\t</div>\n\t<div class="hint-tip" style="display:none">\n\t\t<i class="icon-hint"></i>温馨提醒：设置后，只有您指定的网站，才能引用您的照片。避免其它网站盗用您的外链照片，消耗您的流量。\n\t\t<a href="http://service.qq.com/info/52893.html" target=\'_blank\'>了解更多</a>\n\t</div>\n</div>\n<div class="link-manage">\n\t<div class="compacity">\n\t\t<p>'),
                _p(title),
                __p.push("享有流量"),
                _p(total),
                __p.push("G/月，已用"),
                _p(hasUsed),
                __p.push('%<a href="javascript:void(0)" id="detail-outlink">详情</a></p>\n\t\t<p style="display:none;">本月流量计算截至'),
                _p(statTime.getMonth() + 1),
                __p.push("月"),
                _p(statTime.getDate()),
                __p.push('日</p>\n\t\t<p style="display:none;">下个月流量计算从'),
                _p(nextStartTime.getMonth() + 1),
                __p.push("月"),
                _p(nextStartTime.getDate()),
                __p.push("日开始到"),
                _p(endTime.getMonth() + 1),
                __p.push("月"),
                _p(endTime.getDate()),
                __p.push('日</p>\n\t</div>\n\t<a style="display:none" onclick="window.location=\'/qzone/photo/zone/link_admin.html\'" href="/qzone/photo/zone/link_admin.html" class="manage-op">管理历史外链</a>\n</div>')
            }
            return __p.join("")
        },
        singleLink: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {})
                __p.push('<li>\n\t<div class="single-link-show">\n\t\t<p class="single-link-info">'),
                _p(escHTML(data)),
                __p.push('</p>\n\t\t<div class="single-link-op">\n\t\t\t<a href="javascript:void(0)" title="编辑" class="edit-outlink">编辑</a>\n\t\t\t<span>|</span>\n\t\t\t<a href="javascript:void(0)" title="删除" class="del-outlink">删除</a>\n\t\t</div>\n\t</div>\n</li>');
            return __p.join("")
        },
        page: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {})
                __p.push('<div class="photo_layer js-viewer-container mod-normal" id="js-viewer-container"  style="z-index:5500;">\n\t<div id="js-viewer-layer" class="photo_bg_layer js-viewer-layer" onclick="javascript:if(slide.util.getParameter(\'inqq\')){return;}try{slide&&slide.beforeClose();}catch(err){}var ctn = document.getElementById(\'js-viewer-container\');ctn.style.display=\'none\';slide&&slide.close({noTriggerBeforeClose:true});"></div>\n\t<div class="screen_handle_tab" style="display:none">\n\t\t<p class="comment" title="评论"><i class="icon icon_comment_bphoto" ><i></i></i></p>\n\t\t<p class="reproduced" title="转载"><i class="icon icon_reproduced_bphoto"><i></i></i></p>\n\t\t<p class="share" title="分享"><i class="icon icon_share_bphoto"><i></i></i></p>\n\t</div>\n\t\x3c!--图片区S--\x3e\n\t<div class="photo_figure" id="js-viewer-figure">\n\t\t<div class="photo_figure_main" id="js-viewer-main" style="display: none;">\n\t\t\t<div class="photo_layer_close" data-toggle="tooltip" title="关闭" onclick="javascript:try{slide&&slide.beforeClose();}catch(err){}var ctn = document.getElementById(\'js-viewer-container\');ctn.style.display=\'none\';slide&&slide.close({noTriggerBeforeClose:true});" ontouchend="javascript:try{slide&&slide.beforeClose();}catch(err){}var ctn = document.getElementById(\'js-viewer-container\');ctn.style.display=\'none\';slide&&slide.close({noTriggerBeforeClose:true});return false;">\n\t\t\t    <a href="javascript:void(0);" onclick="return false;" >关闭</a>\n\t\t\t</div>\n\t\t\t<div id="js-hdmode-close"  class="photo_layer_close" title="退出全屏模式" style="display:none;"><a href="javascript:;">关闭</a></div>\n\t\t\t\n\t\t\t\x3c!--图片展示区S--\x3e\n\t\t\t<div class="figure_area" id="js-viewer-imgWraper"  style="width:670px;">\n\t\t\t\t<input type="text" style="position:absolute;top:0px;left:0px;width:1px;height:1px;font-size:0;border:1px;outline:none;opacity:0.1;filter:alpha(opacity=10)"  value="" id="js-focus-input" />\n\t\t\t\t<p class="HD" style="z-index:500;display:none;"><a href="javascript:;" target="_blank">查看原图<span id="js-hd-size"></span></a></p>\n\t\t\t\t<a href="javascript:void(0);" id="js-link-hd" class="show-original" style="display:none;">查看原图</a>\n\t\t\t\t<div class="figure_img" id="js-image-ctn" style="-moz-user-select:none;position:relative;" onselectstart="return false;"  hideFocus="true" style="-moz-user-select:none;" onselectstart="return false;" >\n\t\t\t\t\t<img src="about:blank;" id="js-img-disp" style="display:none;position:absolute;" hideFocus="true"/>\n\t\t\t\t\t<img src="about:blank;" id="js-img-trans" style="display:none;position:absolute;" hideFocus="true"/>\n\t\t\t\t</div>\n\t\t\t\t\x3c!--TODO: --\x3e\n\t\t\t\t<div class="mod-figure-area" id="js-figure-area">\n\t\t\t\t\t<div id="js-ctn-infoBar" class="figure-desc" style="display:none;">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="figure-handle">\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a id="js-btn-changeMode" style="display:none"  href="javascript:;"  class="icon-wrap js-show-normal func-zoom"><i class="icon-m icon-magnify"></i></a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a id="js-btn-rotateRight" href="javascript:void(0)" title="旋转" class="icon-wrap func-zoom"><i class="icon-m icon-rotate"></i></a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<div class="photo-view-mode">\n\t\t\t\t\t\t\t\t\t<a href="javascript:void(0)" class="selected-mode js-normal-mode mode-normal" title="小图模式"><i class="icon-m icon-small-view">小图模式</i></a>\n\t\t\t\t\t\t\t\t\t<a href="javascript:void(0)" class="js-large-mode js-large-button mode-large" title="大图模式"><i class="icon-m icon-big-view">大图模式</i></a>\n\t\t\t\t\t\t\t\t\t<a href="javascript:void(0)" class="js-large-mode js-hd-button mode-hd" title="大图模式"><i class="icon-m icon-hd-view">高清模式</i></a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</li>\n\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<div class="photo-hd-mode photo-hd-all" style="display:none;">\n\t\t\t\t\t\t\t\t\t<a href="javascript:void(0)" class="func-more js-large-mode" title="大图模式"><i class="icon-m icon-hd-m">HD</i></a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<div class="photo-hd-mode">\n\t\t\t\t\t\t\t\t\t<a id="js-btn-fullscreen" style="display:none" href="javascript:void(0)" class="func-more" title="幻灯片播放" ><i class="icon-m icon-full-view"></i>播放</a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</li>\n\n\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="figure-area-mask"></div>\n\t\t\t\t</div>\n\t\t\t\t<div id="js-map-ctn" class="figure_img_map" style="display:none;">\n\t\t\t\t\t<img id="js-img-map" src="about:blank;" style="display:none"/>\n\t\t\t\t\t<p id="js-map-handler" class="visible_area" style="display:none;cursor:move;"></p>\n\t\t\t\t</div>\n\t\t\t\t<div id="_slideView_scale_num" class="scale_num" style="display:none"><p>150%</p></div>\n\t\t\t\t<div class="photo-save-tip" id="js-btn-saveRotate" style="display:none">\n                    <div class="save-tip-cont">\n                        <p> 是否保存旋转后的照片？</p>\n                        <div class="save-tip-op">\n                            <a href="javascript:;" class="save-tip-select js-save-rotate-ok">保存</a>\n                            <a href="javascript:;">取消</a>\n                        </div>\n                    </div>\n                </div>\n\t\t\t\t<a id="js-btn-prevPhoto" href="javascript:;" class="js-btn-changePhoto figure-area-arrow arrow-pre " style="top:45%;display:none;">上一张</a>\n\t\t\t\t<a id="js-btn-nextPhoto" href="javascript:;" class="js-btn-changePhoto figure-area-arrow arrow-next" style="top:45%;display:none;">下一张</a>\n\t\t\t\t<a href="javascript:void(0)" style="z-index:100;display:none;" id="js-btn-play-gif" class="play-the-video" title="播放"></a>\n\t\t\t</div>\n\t\t\t\x3c!--图片展示区e--\x3e\n\t\t\t\x3c!--图片右侧详情区S--\x3e\n\t\t\t<div class="figure-side" id="js-sidebar-ctn" style="padding-bottom:30px;">\n\t\t\t\t<div class="figure-side-wrap">\n\t\t\t\t    <div class="figure-side-bg"  id="js-cmt-wrap">\n\t\t\t\t\t\n\t\t\t\t\t\t<div class="figure-side-inner">\t\n\t\t\t\t\t\t\t\x3c!--照片所属信息区S--\x3e\n\t\t\t\t\t\t\t<div class="figure-side-hd">\n\t\t\t                     <div class="js-userinfo-ctn">\n                                 </div>\n                                 \n                                 \x3c!--照片编辑区S--\x3e\n                                <div class="info-edit" id="js-desc-editor" style="display:none;">\n                                    <div class="tit-edit-warp textinput js-title-editor">\n                                        <div class="tit-edit">\n                                            <input type="text" class="js-desc-title"/>\n                                            <span class="watermark">照片标题</span>\n                                            <span class="num-count"><span class="num-hint js-desc-title-currword">30</span>/30</span>\n                                        </div>\n                                    </div>\n                                    <div class="desc-edit js-desc-cont">\n                                        <span class="num-count"><span class="num-hint js-desc-currword">0</span>/200</span>\n                                    </div>\n                                    <div class="info-submit">\n                                        <a href="javascript:void(0)" class="info-confirm js-desc-ok">确定</a>\n                                        <a href="javascript:void(0)" class="info-cancel js-desc-cancel">取消</a>\n                                    </div>\n                                </div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\x3c!--照片评论区S--\x3e\n\t\t\t\t\t\t\t<div class="handle-tab" style="display:none;">\n                                <ul>\n                                    <li id="js-viewer-like" class="praise" title="赞">\n                                    </li>\n                                    <li>\n                                        <a href="javascript:;" class="handle-item" id="js-viewer-comment" title="评论"><i class="icon-m icon-comment-m">评论</i><span class="btn-txt">评论</span><span class="btn-txt-num"></span></a>\n                                    </li>\n                                    <li id="js-interactive-btn">\n                                        <a href="javascript:;" class="handle-item"><i class="icon-m icon-reproduced-m">互动</i><span class="btn-txt"></span><span class="btn-txt-num"></span></a>\n                                    </li>\n                                    <li id="js-othermenu-btn" class="more">\n                                        <a href="javascript:;" class="handle-item"><i class="icon-m icon-other-m">其他</i></a>\n                                    </li>\n                                </ul>\n                            </div>\n\t\t\t\t\t\t\t<p class="figure_praise_num js_fade_like" id="_slideView_like"></p>\n\t\t\t\t\t\t\t<div class="figure-interactive">\n\t\t\t\t\t\t\t\t<p class="figure_praise_num" id="js-like-list">\n\t\t\t\t\t\t\t\t\t<span class="figure-praise-arr"><span class="mod-arr"></span></span>\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t<div class="comment-tab" style="display:none" id="j-comment-tab">\n\t\t\t\t\t\t\t\t\t<a href="javascript:;" class="tab-selected" data-type=\'friend\'>好友评论</a>\n\t\t\t\t\t\t\t\t\t<a href="javascript:;" data-type=\'cmtreply\'>精选评论</a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="handle_main js_show_comment" id="js-comment-ctn">\n\t\t\t\t\t\t\t\t\t<div class="js_mod_comment_module" id="js-comment-module">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="js_mod_retweet" id="js-mod-retweet">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\x3c!--我评论区E--\x3e\n\t\t\t\t\t\t\t\x3c!--照片评论区E--\x3e\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="figure-comment"></div>\n\t\t\t\t</div>\n\t\t\t\t<div id="js-qq-ad" data-inqq="1" style="display:none; left:20px; position: absolute; height: 110px; width: 260px; overflow: hidden; bottom: 55px;">\n\t\t\t\t</div>\n\t\t\t\t\x3c!--圈人推荐--\x3e\n\t\t\t\t<div id="js-face-area" class="figure-side-circle" style="display:none;">\n\t\t\t\t</div>\n\t\t\t\t<div class="friend-list-wrap j-selector-wrap" style="width:170px; top:-999px; left:112px; display:none;">\n\t\t\t\t</div>\n\t\t\t\t\x3c!--互动菜单--\x3e\n\t\t\t\t<div class="mod-layer-drop" id="js-interactive-menu" style="left:-3px;display:none;">\n                    <ul>\n                        <li style="display:none;">\n                            <a href="javascript:;" id="js-viewer-reprint">转载</a>\n                        </li>\n                        <li style="display:none">\n                            <a href="javascript:;" id="js-viewer-retweet"  class="retweet js_retweet" title="转发">转发</a>\n                        </li>\n                        <li style="display:none;">\n                            <a href="javascript:;" id="js-btn-sharePhoto">分享</a>\n                        </li>\n                        <li style="display:none;">\n                            <a href="javascript:;" id="js-btn-copyAddress">复制地址</a>\n                        </li>\n                    </ul>\n                    <span class="mod-arr mod-arr-t"><span></span></span>\n                </div>\n                \x3c!--其他菜单--\x3e\n\t\t\t\t<div class="mod-layer-drop" id="js-other-menu" style="left:-4px;display:none">\n                    <ul>\n\t                    <li id="js-btn-open-quanren" class="js-hide-when-video" style="display:none;">\n\t\t                    <a href="javascript:;"  >圈人</a>\n\t\t                    <span class="drop-item-seprate"></span>\n\t                    </li>\n\t                    <li id="js-btn-cover-li" style="display:none;">\n\t\t                    <a href="javascript:;" id="js-btn-cover">设为封面</a>\n\t                    </li>\n\t                    <li id="js-btn-qzone-cover-li" style="display:none;">\n\t\t                    <a href="javascript:;" id="js-btn-qzone-cover">主页展示</a>\n\t                    </li>\n\t                    <li id="js-btn-movePhoto-li" style="display:none;">\n\t\t                    <a href="javascript:;" id="js-btn-movePhoto">移动</a>\n\t                    </li>\n\t                    <li id="js-btn-downloadPhoto-li">\n\t\t                    <a href="javascript:;" id="js-btn-downloadPhoto">下载图片</a>\n\t\t                    \x3c!--<div class="more-download" style="display:none">\n\t\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\t\t<li><a href="javascript:void(0)" id="js-btn-downloadNormalInViewer">大图 </a></li>\n\t\t\t\t\t\t\t\t\t<li><a href="javascript:void(0)" id="js-btn-downloadOrigin">原图 </a></li>\n\t\t\t\t\t\t\t\t\t<li><a href="javascript:void(0)" id="js-btn-downloadHighClear">高清图 </a></li>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t<i class="more-download-arr"></i>\n\t\t\t\t\t\t\t</div>--\x3e\n\t                    </li>\n\t                    <li id="js-btn-collect-li" style="display:none;">\n\t\t                    <a href="javascript:;" id="js-btn-collect">收藏</a>\n\t                    </li>\n\t                    <li id="js-btn-delPhoto-li" style="display:none;">\n\t\t                    <a href="javascript:;" id="js-btn-delPhoto">删除</a>\n\t                    </li>\n\t                    \x3c!--\n\t                    <li id="js-btn-meihua-li" class="js-hide-when-video" style="display:none;">\n\t\t                    <span class="drop-item-seprate"></span>\n\t\t                    <a href="javascript:;" id="js-btn-meihua">美化</a>\n\t                    </li>\n\t                    <li id="js-btn-tuya-li" class="js-hide-when-video" style="display:none;">\n\t\t                    <a href="javascript:;" id="js-btn-tuya">涂鸦</a>\n\t                    </li>\n\t                    <li id="js-btn-meituxiuxiu-li" class="js-hide-when-video" style="display:none;">\n\t\t                    <a href="javascript:;" id="js-btn-meituxiuxiu"  class="open-meitu">美图秀秀</a>\n\t                    </li>\n\t                    --\x3e\n\t                    <li id="js-btn-follow-li" style="display:none;">\n\t\t                    <a href="javascript:;" id="js-btn-follow"  class="open-meitu">关注</a>\n\t                    </li>\n                    </ul>\n                    <span class="mod-arr mod-arr-t"><span></span></span>\n                </div>\n\t\t\t\t<div class="figure-side-ft" id="js-sidebar-foot">\n\n\t\t\t\t\t<a class="js-report-btn op-pic-policy" href="javascript: void(0);"><i></i>举报</a>\n\t\t\t\t\t\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t\x3c!--图片右侧详情区e--\x3e\n\t\t</div>\t\n\t</div>\n\t\x3c!--图片区e--\x3e\n\t<div id="js-ctn-switch" class="photo_minimap_switch" style="display: none;">\n\t\t<div id="js-switch-inner" class="inner">\n\t\t\t<div id="js-thumb-unexpand" class="photo_minimap_fold"><a href="javascript:;" class="switch"><b class="ui_trig ui_trig_b"></b><span class="txt">收起</span></a></div>\n\t\t\t<div id="js-thumb-expand" class="photo_minimap_unfold"><a href="javascript:;" class="switch"><b class="ui_trig ui_trig_t"></b></a></div>\n\t\t</div>\n\t</div>\n\t\x3c!--缩略图滚动区S--\x3e\n\t<div id="js-thumb-ctn"  onselectstart="return false;" class="photo_minimap_v2" style="-moz-user-select:none;width:1069px; max-width:auto">\n\t\t<h4 id="js-thumb-title" class="mod-title" style="display:none;"></h4>\n\t\t<div id="js-thumb-subctn"  class="photo_minimap_inner video-list-wrap" style="">\n\t\t\t<p id="js-thumb-prev" class="photo_minimap_roll roll_left btn-control btn-control-prev" style="visibility:hidden;"><a href="javascript:;"  ><span></span></a></p>\n\t\t\t<p id="js-thumb-next" class="photo_minimap_roll roll_right btn-control btn-control-next" style="visibility:hidden;"><a href="javascript:;" ><span></span></a></p>\n\t\t\t<div id="js-thumbList-stage" class="photo_mini_img video-list clearfix" style="overflow:hidden; margin:0 30px; padding:0px;">\n\t\t\t\t<ul id="js-thumbList-ctn" style="margin:0px auto;">\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t\x3c!--缩略图区E--\x3e\n</div>');
            return __p.join("")
        },
        imgLoading: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {})
                __p.push('    <div class="figure_img_loading" id="js-img-loading" style="z-index:6;position:absolute"></div>');
            return __p.join("")
        },
        video_play: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {})
                __p.push('    <a href="javascript:void(0)" class="play-the-video js-video-singletip js-video-play" style="z-index:100;display:none"></a>');
            return __p.join("")
        },
        video_loading: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {})
                __p.push('    <span class="video-loading js-video-singletip js-video-loading" style="display:none;"><i class="inner"></i></span>');
            return __p.join("")
        },
        video_error: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {})
                __p.push('    <p class="js-video-singletip js-video-error" style="z-index:100;position:absolute;left:0px;top:50%;width:100%;height:24px;line-height:24px;margin:-12px 0px;text-align:center;font-size:14px;color:#fff;display:none">视频无法播放</p>');
            return __p.join("")
        },
        video_nexttip: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {})
                __p.push('    <span class="video-tips js-video-nexttip" style="z-index:100;position:absolute;left:50%;bottom:60px;width:126px;height:34px;line-height:34px;padding:0 12px;margin:0 -75px;color:#fff;background:rgba(0,0,0,.4);display:none;"><i class="inner">即将播放下一个视频</i></span>');
            return __p.join("")
        },
        cmtreply: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {}) {
                __p.push('\t<div class="mod_comment mod_comment_auto_open" style="display:none" data-type=\'cmtreply_list\'>\n\t\t<div class="mod_comments">\n\t\t\t<div class="comments_list">\n\t\t\t\t<div class="comments_list_more j-comments-list-more" style="display:'),
                _p(10 < total ? "block" : "none"),
                __p.push(';">\n\t\t\t\t\t<a class="c_tx">查看全部\n\t\t\t\t\t\t<span>'),
                _p(total - 10),
                __p.push('</span>条评论\n\t\t\t\t\t\t<span>&gt;&gt;</span>\n\t\t\t\t\t</a>\n\t\t\t\t</div>\n\t\t\t\t<div class="comments_list_more j-comments-list-more" style="display: none;">\n\t\t\t\t\t<i class="ui_ico ico_expanding"></i>正在展示更多评论...\n\t\t\t\t</div>\n\t\t\t\t<ul id="j-cmtreply-list">');
                for (var i = 0; comments && i < comments.length && i < 10; i++)
                    __p.push('\t\t\t\t\t<li class="comments_item bor3">\n\t\t\t\t\t\t<div class="comments_item_bd">\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<div class="ui_avatar">\n\t\t\t\t\t\t\t\t\t<a href="http://user.qzone.qq.com/'),
                    _p(comments[i].poster.id),
                    __p.push('" target="_blank">\n\t\t\t\t\t\t\t\t\t\t<img src="http://qlogo3.store.qq.com/qzone/'),
                    _p(comments[i].poster.id),
                    __p.push("/"),
                    _p(comments[i].poster.id),
                    __p.push('/50?1391375398">\n\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="comments_content">\n\t\t\t\t\t\t\t\t\t<span class="comments-content-publish">\n\t\t\t\t\t\t\t\t\t\t<a class="nickname" href="http://user.qzone.qq.com/'),
                    _p(comments[i].poster.id),
                    __p.push('" target="_blank">'),
                    _p(PSY.ubb.ubb2html(comments[i].poster.name, {
                        from: "nick",
                        decodeHtml: !1
                    })),
                    __p.push('</a>\n\t\t\t\t\t\t\t\t\t\t<span class="private-txt"></span> : \n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t<span class="comments-content-detail">'),
                    _p(PSY.ubb.ubb2html(comments[i].content, {
                        formatTopic: !0,
                        decodeHtml: !0,
                        showAt: !0,
                        formatUrl: !0
                    })),
                    __p.push('</span>\n\t\t\t\t\t\t\t\t\t<div class="none">\n\t\t\t\t\t\t\t\t\t\t<div></div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>');
                __p.push('\t\t\t\t</ul>\n\t\t\t</div>\n\t\t\t\x3c!-- page start --\x3e\n\t\t\t<form method="POST" class="mod_pagenav" style="display: none;" id="j-page-index-wrap">\n\t\t\t\t<div class="bg2 mod_comment_page">\n\t\t\t\t\t<p>\n\t\t\t\t\t\t<a class="c_tx3 j-page-index j-page-button" data-type=\'1\'>上一页</a>');
                var tempNum = Math.floor(total / 10) + 1;
                __p.push("\t\t\t\t\t\t<span>");
                for (var k = 0; k < tempNum; k++)
                    __p.push("\t\t\t\t\t\t\t\t"),
                    0 == k ? __p.push('\t\t\t\t\t\t\t\t\t<a class="current j-page-index j-page-num" data-index=\'') : __p.push('\t\t\t\t\t\t\t\t\t<a class="c_tx j-page-index j-page-num" href="javascript:;" data-index=\''),
                    _p(k + 1),
                    __p.push("'>"),
                    _p(k + 1),
                    __p.push("</a>"),
                    __p.push("\t\t\t\t\t\t\t");
                __p.push("\t\t\t\t\t\t</span>"),
                1 < tempNum ? __p.push('\t\t\t\t\t\t\t<a class="c_tx j-page-index j-page-button" href="javascript:;" data-type=\'2\'>下一页</a>') : __p.push("\t\t\t\t\t\t\t<a class=\"c_tx3 j-page-index j-page-button\" data-type='2'>下一页</a>"),
                __p.push("\t\t\t\t\t</p>\n\t\t\t\t</div>\n\t\t\t</form>\n\n\t\t\t\x3c!-- end --\x3e\n\t\t</div>\n\t</div>")
            }
            return __p.join("")
        },
        cmtreplyList: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {}) {
                __p.push("\t");
                for (var i = 0; comments && i < comments.length; i++)
                    __p.push('\t\t<li class="comments_item bor3">\n\t\t\t<div class="comments_item_bd">\n\t\t\t\t<div>\n\t\t\t\t\t<div class="ui_avatar">\n\t\t\t\t\t\t<a href="http://user.qzone.qq.com/'),
                    _p(comments[i].poster.id),
                    __p.push('" target="_blank">\n\t\t\t\t\t\t\t<img src="http://qlogo3.store.qq.com/qzone/'),
                    _p(comments[i].poster.id),
                    __p.push("/"),
                    _p(comments[i].poster.id),
                    __p.push('/50?1391375398">\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="comments_content">\n\t\t\t\t\t\t<span class="comments-content-publish">\n\t\t\t\t\t\t\t<a class="nickname" href="http://user.qzone.qq.com/'),
                    _p(comments[i].poster.id),
                    __p.push('" target="_blank">'),
                    _p(PSY.ubb.ubb2html(comments[i].poster.name, {
                        from: "nick",
                        decodeHtml: !1
                    })),
                    __p.push('</a>\n\t\t\t\t\t\t\t<span class="private-txt"></span> : \n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<span class="comments-content-detail">'),
                    _p(PSY.ubb.ubb2html(comments[i].content, {
                        formatTopic: !0,
                        decodeHtml: !0,
                        showAt: !0,
                        formatUrl: !0
                    })),
                    __p.push('</span>\n\t\t\t\t\t\t<div class="none">\n\t\t\t\t\t\t\t<div></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</li>');
                __p.push("")
            }
            return __p.join("")
        },
        tagged_item_inViewer_list: function(e) {
            function t(e) {
                o.push(e)
            }
            for (var i, o = [], n = e.photo, s = e.loginUin, a = e.faceList || [], r = [], d = 0, l = a.length; d < l; d++)
                1 === (i = a[d]).quanstate && r.push(i);
            for (d = 0,
            l = r.length; d < l; d++)
                (i = r[d]).canDel = i.faceid && -1 == i.faceid.toString().search("new") && -1 == i.faceid.toString().search("facerect") && (s && n.ownerUin == s || i.targetuin == s || i.writeruin == s),
                i.addStr = d < l - 1 ? "、" : "",
                t(0 === d ? "和" : ""),
                t(tmpl.tagged_item_inViewer(i));
            return o.push(""),
            o.join("")
        },
        tagged_item_inViewer: function(e) {
            function t(e) {
                i.push(e)
            }
            var i = []
              , o = e.target || e.targetuin
              , n = e.targetnick
              , s = e.faceid
              , a = e.canDel || !1;
            return i.push('<span id="tagged_'),
            t(s),
            i.push('">\n\t<a id="label" data_id="'),
            t(s),
            i.push('" link="nameCard_'),
            t(s),
            i.push('" class="q_namecard name" href="http://user.qzone.qq.com/'),
            t(o),
            i.push('/" target="_blank" title="">'),
            t(tmpl.PSY.ubb.ubb2html(n, {
                from: "nick",
                decodeHtml: !1
            })),
            i.push("</a>"),
            a && (i.push('\t\t<a data_id="'),
            t(s),
            i.push('" href="javascript:void(0);" title="删除" class="icon-m icon-del-m j-del-btn"></a>')),
            i.push("\t"),
            t(e.addStr),
            i.push("</span>"),
            i.join("")
        },
        recom: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {})
                __p.push('    <div id="js-recom-wrapper">\n        <div class="photo_bg_layer photo_bg_layer_light" id="js-recom-layer" onclick="return false;" style="z-index:1001;"></div>\n        <div class="layer_recommend" id="js-recom-ctn" style="z-index:1001;">\n            <a href="javascript:void(0);" onclick="return false;" id="js-recom-closeBtn" class="close">X</a>\n            <div class="recommendline">\n                <p class="last">已到该相册的最后一张照片</p>\n                <p class="handle">\n                    <a href="javascript:void(0);" id="js-btn-review" onclick="return false;" class="relook" style="display: none;"><i class="icon icon_relook"><i></i></i>重新浏览</a>\n                    <a href="javascript:void(0);" id="js-btn-recomCmt" onclick="return false;" class="comment"><i class="icon icon_cment"><i></i></i>发表评论</a>\n                    <a href="javascript:void(0);" id="js-btn-batchReprint" onclick="return false;" class="recom" style="display: none;"><i class="icon icon_recommend"><i></i></i>批量转载</a>\n                </p>\n            </div>\n            \n            <div id="js-recom-otherCtn" class="otherphoto" style="display: none;">\n            \n            </div>\n        </div>\n    </div>');
            return __p.join("")
        },
        albumList: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {}) {
                __p.push("    ");
                var ownerName = data.ownerName, albums = data.album, length = albums.length, ownerUin = data.ownerUin, userLink = "http://user.qzone.qq.com/" + ownerUin, albumListLink = userLink + "/photo", undefined;
                __p.push('    \n    <span class="line"></span>\n    <p class="more_album">\n        <span class="username">\n            <a href="'),
                _p(userLink),
                __p.push('" target="_blank" >'),
                _p(PSY.ubb.ubb2html(escHTML(restHTML(ownerName)))),
                __p.push("            </a>\n            <span> 的其他相册</span>\n        </span>"),
                3 <= length && (__p.push('            <a  href="'),
                _p(albumListLink),
                __p.push('" target="_blank" class="morelink">查看更多</a>')),
                __p.push('    </p>\n    <div class="albumlist">\n        <ul>');
                for (var i = 0; i < albums.length; i++) {
                    var albumInfo = albums[i], aid = albumInfo.id, total = albumInfo.total, pre = albumInfo.pre, url = slide.util.album.getImgUrl(pre, "i"), name = albumInfo.name, albumLink = "http://user.qzone.qq.com/" + ownerUin + "/photo/" + aid, undefined;
                    if (3 == i)
                        break;
                    __p.push('                <li>\n                    <a href="'),
                    _p(albumLink),
                    __p.push('" target="_blank">\n                        <div class="photocount">\n                            <em>'),
                    _p(total),
                    __p.push('</em>张\n                        </div>\n                        <div class="photoimg">\n                            <img data-src="'),
                    _p(url),
                    __p.push('" src="about:blank" class="js-recom-albumPhoto"/>\n                        </div>\n                        <p class="photoname">'),
                    _p(escHTML(restHTML(name))),
                    __p.push("                        </p>\n                    </a>\n                </li>")
                }
                __p.push('        </ul>\n    </div>\n    <div class="ad-area" id="js-ad-area" style="display: none;">\n\t    <a href="javascript:void(0);" target="_self" id="js-ad-link"><img id="js-ad-img"></a>\n    </div>')
            }
            return __p.join("")
        },
        rightmenu: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {}) {
                __p.push("\t");
                var appid = slide.config.appid, undefined;
                __p.push('\t<div class="js-rightmenu-box" style="">\n\t\t<ul style="">\n\t\t\t<li style="display: none"><a href="javascript:void(0)" >复制图片</a></li>'),
                (4 == appid || external && external.saveFile) && __p.push('                    <li>\n                        <a href="javascript:void(0)" id="js-btn-downloadThisImg">下载该图片</a>\n                    </li>'),
                __p.push('            <li><a id="js-btn-copyThisUrlAddress" href="javascript:void(0)">复制图片地址</a></li>\n\t\t\t<li>\n\t\t\t\t<a href="javascript:void(0)" id="js-btn-openNewImg">新窗口打开图片</a>\n\t\t\t</li>\n\t\t</ul>\n\t</div>')
            }
            return __p.join("")
        },
        rightmenuCopyAdderss: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {}) {
                __p.push("    ");
                var url = data;
                __p.push('   <div class="mod-photo-poplayer mod-copy-layer" style="position:static;width:540px;">\n    <div class="photo-poplayer-bd">\n        <div class="mod-innerlinks">\n            <p class="panel-link">\n                <label for="">本图地址：</label>\n                <input type="text" name="" value="'),
                _p(url),
                __p.push('" id="js-thisimg-url">'),
                window.clipboardData ? __p.push('                            <a href="javascript:void(0)" class="copy-link" id="js-thisimg-copybtn">复制</a>') : __p.push("                            <span>Ctrl+C复制</span>"),
                __p.push("            </p>\n        </div>\n    </div>\n</div> ")
            }
            return __p.join("")
        },
        scrollBar: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {})
                __p.push('\t<div class="js-scrollbar" style="display:none">\n\t\t<a class="js-scrolling" style="height:135px;margin-top:0;top:0;display:block;" href="javascript:void(0)">\n\t\t\t<span class="js-scrolling-inner"  style=""></span>\n\t\t</a>\n\t</div>');
            return __p.join("")
        },
        style: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {})
                __p.push('<style id="viewerStyle">\n.js_fade_like{\n\tline-height:0px;\n\tdisplay:none;\n}\n\n.figure-comment{\n\tdisplay : none;\n}\n.figure-comment.js-can-comment{\n\tdisplay : block;\n}\n\n.js_show_comment #mod_comment_module{}\n.js_show_comment #mod_retweet{\n\tdisplay : none;\n}\n.js_show_comment #mod_retweet .textinput{\n\tvisibility:hidden;\n}\n\n.js_show_retweet #mod_comment_module{\n\tdisplay : none;\n}\n.js_show_retweet #mod_retweet{}\n.mod_comment_report{\n\tvisibility:hidden;\n}\n\n.js_standalone_mode .photo_layer_close{\n\tvisibility:hidden;\n}\n.js_standalone_mode .photo_layer {\n\tpadding : 0;\n}\n.js_standalone_mode .js_reproduced{\n\tvisibility :hidden;\n}\n.js-scrolling-inner{\n\tbackground-color:#c9c9c9;\n}\n\n.js-scrollbox{\n\toverflow:hidden;\n\theight:100%;\n\tposition:relative;\n}\n.js-scrollcont{\n\theight:100%;\n\toverflow-x:hidden;\n\toverflow-y:scroll;\n\tpadding-right:60px;\n\tposition:relative;\n\twidth:100%;\n}\n.js-scrollbar{\n\theight:100%;\n\tposition:absolute;\n\tright:0;\n\ttop:0;\n\twidth:15px;\n\tz-index:9;\n}\n.js-scrolling-inner{\n\tborder-radius:4px 4px 4px 4px;\n\tdisplay:block;\n\theight:100%;\n\twidth:6px;\n\tfloat:right;\n}\n.js-scrolling-inner-hover{\n\twidth:10px;\n\tborder-radius:6px 6px 6px 6px;\n}\n.js-scrollbar-hover{\n\twidth:15px;\n}\n\na:hover .js-scrolling-inner,a:active .js-scrolling-inner{\n\tbackground-color:#a8a8a8;\n}\n\n.rotate{\n\ttransition:transform 0.2s linear;\n\t-webkit-transition:-webkit-transform 0.2s linear;\n\t-moz-transition:-moz-transform 0.2s linear;\n\t-o-transition:-o-transform 0.2s linear;\n\t-ms-transition:-ms-transform 0.2s linear;\n}\n\n.js-fullscreen-wrapper{\n\tposition:absolute;\n\ttop:0;\n\tleft:0;\n\tright:0;\n\tbottom:0;\n\tz-index:9999;\n\tbackground-color:#000;\n\t-webkit-backface-visibility:hidden;\n}\n\n.js-fullscreen-layer-transition{\n\ttransition:opacity 1.2s ease-out;\n\t-webkit-transition:opacity 1.2s ease-out;\n\t-moz-transition:opacity 1.2s ease-out;\n\t-o-transition:opacity 1.2s ease-out;\n\t-ms-transition:opacity 1.2s ease-out;\n\topacity: 1;\n}\n.js-fullscreen-layer-transition-none{\n\ttransition:none;\n\t-webkit-transition:none;\n\t-moz-transition:none;\n\t-o-transition:none;\n\t-ms-transition:none;\n\topacity: 0;\n}\n\n.js-fullscreen-cont{\n\tposition:absolute;\n\ttop:0;\n\tleft:0;\n\tright:0;\n\tbottom:0;\n}\n\n.js-fullscreen-cont-transition{\n\ttransition:1.2s ease-out;\n\t-webkit-transition:1.2s ease-out;\n\t-moz-transition:1.2s ease-out;\n\t-o-transition:1.2s ease-out;\n\t-ms-transition:1.2s ease-out;\n}\n\n.js-fullscreen-img{\n\tposition:absolute;\n\tdisplay:none;\n\ttop:0;\n\tleft:0;\n\tright:0;\n\tbottom:0;\n\tbackground-repeat:no-repeat;\n\tbackground-size:cover;\n\tbackground-position:top left;\n\t-webkit-transform-origin:0px 0px;\n}\n\n.js-rightmenu-box{\n\twidth:110px;\n\tposition:absolute;\n\tz-index:9999;\n}\n.js-rightmenu-box ul{\n\tbackground-color:#FFF\n}\n.js-rightmenu-box ul li{\n\tmargin:0;\n\theight:auto;\n\tline-height:normal;\n}\n.js-rightmenu-box ul li a{\n\tdisplay:block;\n\twidth:100%;\n\tpadding:8px 0;\n\ttext-align:center;\n\tcolor:#333;\n}\n.js-rightmenu-box ul li a:hover{\n\tbackground-color:#5CAAE6;\n\tcolor:#FFF;\n\ttext-decoration:none;\n}\n\n.js-hidden {\n    visibility:hidden\n}\n\n.handle-tab .btn-txt{\n\tdisplay:none;\n}\n.handle-tab .btn-txt-num{\n\tdisplay:none;\n}\n.handle-tab.j-show-txt .btn-txt{\n\tdisplay:inline-block;\n}\n.handle-tab.j-show-txt-num .btn-txt-num{\n\tdisplay:inline-block;\n}\n\n.js-thumb-item {\n\tposition: relative;\n\tdisplay: inline-block;\n\tfloat: left;\n}\n\n</style>');
            return __p.join("")
        },
        thumbNail: function(data) {
            var __p = []
              , _p = function(e) {
                __p.push(e)
            }
              , out = _p;
            with (data || {}) {
                __p.push("\t");
                for (var thumbCfg = data.thumbCfg, util = data.util, i = startIndex, len = data.photos.length; i < startIndex + len; i++) {
                    var photo = data.photos[i - startIndex], pre = escHTML(photo.pre), picKey = photo.picKey || photo.id, cmtTotal = photo.cmtTotal, disp = 0 < cmtTotal && !thumbCfg.hideCmt && "comment" !== slide.option.type && !photo.is_weixin_mode ? "block" : "none", liveIcon = "", liveIconText = "", playingText = "正在播放...", undefined, appid = 0;
                    if (pre.indexOf("rf=") < 0 && (pre += (-1 < pre.indexOf("?") ? "&" : "?") + "rf=viewer_" + appid),
                    slide.supportWebp && pre.indexOf("t=5") < 0 && (pre += (-1 < pre.indexOf("?") ? "&" : "?") + "t=5"),
                    pre = pre.replace(/&amp;/g, "&"),
                    photo.pre = pre,
                    5 == photo.videoType) {
                        var liveType = photo.videoExtend && photo.videoExtend.type;
                        switch (liveType) {
                        case 1:
                            liveIcon = "live",
                            liveIconText = "LIVE",
                            playingText = "正在直播";
                            break;
                        case 2:
                            liveIcon = "replay",
                            liveIconText = "REPLAY",
                            playingText = "正在播放...";
                            break;
                        case 3:
                            liveIcon = "done",
                            liveIconText = "END",
                            playingText = "直播已结束";
                            break;
                        case 4:
                            liveIcon = "replay",
                            liveIconText = "REPLAY",
                            playingText = "正在生成回放"
                        }
                    }
                    __p.push("\t\t"),
                    "videoandrec" == data.type ? (__p.push('\t\t\t\x3c!-- 播放中的加playing mouseover时加hover --\x3e\n\t\t\t<li id="_slideView_minimapimg_li_'),
                    _p(i),
                    __p.push('" style="width:'),
                    _p(thumbCfg.imgWidth),
                    __p.push("px;height:"),
                    _p(thumbCfg.imgHeight),
                    __p.push('px;overflow:hidden;" data-index="'),
                    _p(i),
                    __p.push('" data-picKey="'),
                    _p(picKey),
                    __p.push('" class="item js-thumb-item">\n\t\t\t\t<a href="javascript:void(0)" style="width:'),
                    _p(thumbCfg.imgWidth),
                    __p.push("px;height:"),
                    _p(thumbCfg.imgHeight),
                    __p.push('px;overflow:hidden;position:relative;" class="img js_fade_in" hidefocus="true">\n\t\t\t\t\t<img class="js-thumbNail-img" style="display:none;" id="_slideView_minimapimg_'),
                    _p(i),
                    __p.push('" data-src="'),
                    _p(pre.replace(/\/[mabico]\//, "/c/")),
                    __p.push('"  src="about:blank;"/>\n\t\t\t\t</a>\n\t\t\t\t<div class="info">\n\t\t\t\t\t<div class="inner">\n\t\t\t\t\t\t<p class="title">'),
                    _p(photo.descText || "视频"),
                    __p.push('</p>\n\t\t\t\t\t\t<p class="view"><i class="ui-icon icon-play"></i>播放 '),
                    _p(util.formatNum(photo.singlefeed && photo.singlefeed[7] && photo.singlefeed[7].videoplaycnt || 0)),
                    __p.push('</p>\n\t\t\t\t\t\t<p class="time">'),
                    _p(photo.durationStr),
                    __p.push('</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="info-playing">\n\t\t\t\t\t<div class="inner">\n\t\t\t\t\t\t<p class="status js-thumbNail-playing-text">'),
                    _p(playingText),
                    __p.push('</p>\n\t\t\t\t\t\t<p class="title">'),
                    _p(photo.descText || "视频"),
                    __p.push("</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>"),
                    5 == photo.videoType && (__p.push('\t\t\t\t\t<div class="live-info">\n\t\t\t\t\t\t<div class="inner">\n\t\t\t\t\t\t\t<span class="tag js-thumbNail-live-icon '),
                    _p(liveIcon),
                    __p.push('"><i class="ui-icon"></i></span>\n\t\t\t\t\t\t\t<span class="tag"><i class="ui-icon icon-person"></i>'),
                    _p(util.formatNum(photo.videoExtend && photo.videoExtend.viewerNum || 0)),
                    __p.push('</span>\n\t\t\t\t\t\t\t<span class="tag"><i class="ui-icon icon-heart"></i>'),
                    _p(util.formatNum(photo.videoExtend && photo.videoExtend.likeNum || 0)),
                    __p.push("</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>")),
                    __p.push('\t\t\t\t<span class="mask"></span>\n\t\t\t</li>')) : (__p.push('\t\t\t<li id="_slideView_minimapimg_li_'),
                    _p(i),
                    __p.push('" style="width:'),
                    _p(thumbCfg.imgWidth),
                    __p.push("px;height:"),
                    _p(thumbCfg.imgHeight),
                    __p.push('px;overflow:hidden;" data-index="'),
                    _p(i),
                    __p.push('" data-picKey="'),
                    _p(picKey),
                    __p.push('" class="js-thumb-item">\n\t\t\t\t<a href="javascript:void(0)" style="overflow:hidden;position:relative;" class="mini_img_link js_fade_in" hidefocus="true">\n\t\t\t\t\t<img class="js-thumbNail-img" style="display:none;" id="_slideView_minimapimg_'),
                    _p(i),
                    __p.push('" data-src="'),
                    _p(pre),
                    __p.push('"  src="about:blank;"/>\n\t\t\t\t</a>\n\t\t\t\t<p class="photo_commentcount js-thumb-cmtcount" style="display:'),
                    _p(disp),
                    __p.push(';">\n\t\t\t\t\t<a href="javascript:void(0);">'),
                    _p(cmtTotal),
                    __p.push("</a>\n\t\t\t\t</p>\n\t\t\t</li>")),
                    __p.push("\t")
                }
                __p.push("")
            }
            return __p.join("")
        }
    };
    return tmpl
});
