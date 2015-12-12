using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace games.web.Areas.Memory.Controllers
{
    public class MemoryController : Controller
    {
        // GET: Memory/Memory
        public ActionResult Page()
        {
            return View();
        }
    }
}