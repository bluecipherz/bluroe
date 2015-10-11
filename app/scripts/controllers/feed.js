'use strict';

/**
 * @ngdoc function
 * @name bluroeApp.controller:FeedCtrl
 * @description
 * # FeedCtrl
 * Controller of the bluroeApp
 */
angular.module('bluroeApp')
  .controller('FeedCtrl', function (feedFactory, $stateParams, Comment, Status, TokenHandler) {
    
    	var vm = this;

        this.feeds = feedFactory.getFeeds;

        var updateFeeds = function() {
            vm.feeds = feedFactory.getFeeds();
            console.log('feedFetching complete : ' + feedFactory.getFeeds().length);
            vm.feedLoader = true;
        }


        this.refreshFeeds = function(){
            vm.feedLoader = false;
            feedFactory.update(updateFeeds);
        }
        
        if($stateParams.id) {
        	console.log('fetching feeds for project:' + $stateParams.id)
        	feedFactory.setParams({project:$stateParams.id});
        } else {
        	console.log('fetching global feeds')
        	feedFactory.setParams({})
        }
    	feedFactory.onFetchFeeds(updateFeeds);

        this.postComment = function(feed) {
            Comment.postComment({
                feedid:feed.id, comment:feed.comment
            }).$promise.then(function(result) {
                var comment = result.comment;
                comment.owner = TokenHandler.getUser();
                if(feed.additional_type != 'CommentPosted') {
                    feed.additional_type = 'CommentPosted';
                    // console.log(feed.additional_type)
                    feed.additional_subject_id = comment.id;
                    feed.additional_subject_type = 'App\\Comment';
                    feed.additional_origin = comment.owner;
                }
                feed.comments.push(comment);
            });
            feed.comment = "";
            feed.showDetails = false;
        }

        this.deleteComment = function(index, feed, comment) {
            Comment.deleteComment({
                feedid:feed.id, commentid:comment.id
            }).$promise.then(function(result) {
                feed.comments.splice(index, 1);
            });
        }

        this.removeStatus = function(index, feed) {
            console.log('removing feed:');
            console.log(feed);
            var status = {
                statusid: feed.subject.id
            };
            if(feed.project) {
                status.projectid = feed.project.id;
            }
            Status.deleteStatus(status).$promise.then(function(result) {
                feedFactory.removeFeed(feed);
                updateFeeds();
            });
        }



  });