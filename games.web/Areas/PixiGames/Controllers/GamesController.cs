using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace games.web.Areas.PixiGames.Controllers
{
    public class GamesController : Controller
    {
        // GET: PixiGames/Games
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Tanki() {


            return View();
        }
    }
}