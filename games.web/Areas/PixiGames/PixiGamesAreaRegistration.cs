using System.Web.Mvc;

namespace games.web.Areas.PixiGames
{
    public class PixiGamesAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "PixiGames";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "PixiGames_default",
                "PixiGames/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}