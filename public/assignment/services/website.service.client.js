(function ()
{
    angular
        .module("WamApp")
        .factory("websiteService", websiteService);

    function websiteService()
    {
        var websites =
            [
                { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
                { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
                { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
                { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
                { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
                { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
                { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
            ];

        var api =
            {
                "createWebsite": createWebsite,
                "findWebsitesByUser": findWebsitesByUser,
                "findWebsiteById": findWebsiteById,
                "updateWebsite": updateWebsite,
                "deleteWebsite": deleteWebsite
            };
        return api;

        function createWebsite(userId, website)
        {
            website._id = (new Date).getTime() + "";
            website.developerId = userId;
            websites.push(website);
            return website;
        }

        function findWebsitesByUser(userId)
        {
            var userWebsites = [];
            for (var w in websites)
            {
                var _website = websites[w];
                if (_website.developerId === userId)
                {
                    userWebsites.push(_website);
                }
            }
            return userWebsites;
        }

        function findWebsiteById(websiteId)
        {
            for (var w in websites)
            {
                if (websites[w]._id === websiteId)
                {
                    return websites[w];
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website)
        {
            for (var w in websites)
            {
                if (websites[w]._id === websiteId)
                {
                    website._id = websiteId;
                    websites[w] = website;
                    return;
                }
            }
        }

        function deleteWebsite(websiteId)
        {
            for (var w in websites)
            {
                if (websites[w]._id === websiteId)
                {
                    delete websites[w];
                }
            }
        }
    }
})();