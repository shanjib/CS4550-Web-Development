(function ()
{
    angular
        .module("WamApp")
        .factory("pageService", pageService);

    function pageService()
    {
        var pages =
            [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];

        var api =
            {
                "createPage": createPage,
                "findPagesByWebsiteId": findPagesByWebsiteId,
                "findPageById": findPageById,
                "updatePage": updatePage,
                "deletePage": deletePage
            };
        return api;

        function createPage(websiteId, page)
        {
            page._id = (new Date).getTime() + "";
            page.websiteId = websiteId;
            pages.push(page);
            return page;
        }

        function findPagesByWebsiteId(websiteId)
        {
            var websitePages = [];
            for (var p in pages)
            {
                var _page = pages[p];
                if (_page.websiteId === websiteId)
                {
                    websitePages.push(_page);
                }
            }
            return websitePages;
        }

        function findPageById(pageId)
        {
            for (var p in pages)
            {
                if (pages[p]._id === pageId)
                {
                    return pages[p];
                }
            }
            return null;
        }

        function updatePage(pageId, page)
        {
            for (var p in pages)
            {
                if (pages[p]._id === pageId)
                {
                    page._id = pageId;
                    pages[p] = page;
                    return;
                }
            }
        }

        function deletePage(pageId)
        {
            for (var p in pages)
            {
                if (pages[p]._id === pageId)
                {
                    delete pages[p];
                }
            }
        }
    }
})();
