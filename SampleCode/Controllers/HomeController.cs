using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Web.Mvc;

namespace SampleCode.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Map()
        {
            return View();
        }
        public ActionResult Map1()
        {
            return View();
        }
        public ActionResult Map2()
        {
            return View();
        }
        public ActionResult Map3()
        {
            return View();
        }
        public ActionResult Map4()
        {
            return View();
        }
        public ActionResult Map5()
        {
            return View();
        }
        [HttpGet]
        public JsonResult testConnection()
        {
            string connString = ConfigurationManager.ConnectionStrings["AmardShahrsaziMaryanaj"].ConnectionString;
            string message;

            try
            {
                using (SqlConnection conn = new SqlConnection(connString))
                {
                    conn.Open();
                    message = "✅ Connection Successful: " + conn.ServerVersion;
                }
            }
            catch (Exception ex)
            {
                message = "❌ Connection failed: " + ex.Message;
            }

            return Json(new { result = message }, JsonRequestBehavior.AllowGet);

        }
    }
}