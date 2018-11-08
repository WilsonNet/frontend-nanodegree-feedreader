/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /*Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('urls are defined', function () {
            allFeeds.forEach(obj => {
                expect(obj.url).toBeDefined();
                expect(obj.url.length).not.toBe(0);
            });
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined', function () {
            allFeeds.forEach(obj => {
                expect(obj.name).toBeDefined();
                expect(obj.name.length).not.toBe(0);
            });
        });


    });


    /* Menu test suite */
    describe('The menu', function () {
        /* Test that ensures the menu element is
         * hidden by default. 
         */

        it('menu element is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('visibility changes with click', function () {
            const menuIcon = $('.menu-icon-link');
            const currentState = $('body').hasClass('menu-hidden');
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).not.toBe(currentState);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(currentState);
        });

    });

    /* Initial Entries test suite - async */
    describe('Initial Entries', function () {
        //Load an initial feed        
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            })
        });
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('should have at least one feed entry', function (done) {
            expect($('.feed .entry').children().length).not.toBe(0);
            done();
        });
    });
    /* New Feed Selection suite - async */
    describe('New Feed Selection', function () {
        let oldFeed, newFeed;
        /*Load an initial feed, it requires 2 different feeds */
        beforeEach(function (done) {
            loadFeed(1, function () {
                oldFeed = $('.feed').html();
                loadFeed(0, function () {
                    newFeed = $('.feed').html();
                    done();
                });
            });
        });

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
        */

        it('content should change', function (done) {
            expect(newFeed).not.toBe(oldFeed);
            done();
        });
    });

}());
