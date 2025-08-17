using SampleCode.Models;
using System;
using System.Configuration;
using System.Data.Spatial;
using System.Data.SqlClient;
using System.Linq;
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
                    message = "Connection Successful: " + conn.ServerVersion;
                }
            }
            catch (Exception ex)
            {
                message = "Connection failed: " + ex.Message;
            }

            return Json(new { result = message }, JsonRequestBehavior.AllowGet);

        }


        private readonly AmardShahrsaziMaryanajEntities _dbContext;
        public HomeController()
        {
            _dbContext = new AmardShahrsaziMaryanajEntities();
        }

        public class darkhastValues
        {
            public int Shod { get; set; }
            public string wkt { get; set; }
            public int wkid { get; set; }
        }

        // Update Darkhast Value
        [HttpPost]
        public ActionResult updateDarkhast(darkhastValues darkhastNewValue)
        {
            if (darkhastNewValue is null)
                return Json(new { success = false, message = "Invalid Data" });

            try
            {
                // Your update logic here
                var feature = _dbContext.Darkhast.FirstOrDefault(f => f.shodarkhast == darkhastNewValue.Shod);
                if (feature == null)
                    return Json(new { success = false, message = "Not find Darkhast" });

                // Convert string WKT into DbGeometry
                feature.Shape = DbGeometry.FromText(darkhastNewValue.wkt, darkhastNewValue.wkid);

                _dbContext.SaveChanges();

                return Json(new { success = true, message = "Successful" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }
    }
}