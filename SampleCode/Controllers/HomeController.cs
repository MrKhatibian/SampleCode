using SampleCode.Models;
using System;
using System.Collections.Generic;
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

        private readonly AmardShahrsaziMaryanajEntities _dbContext;
        public HomeController()
        {
            _dbContext = new AmardShahrsaziMaryanajEntities();
        }

        [HttpGet]
        public JsonResult GetAllDarkhast1()
        {
            try
            {
                var list = (from d in _dbContext.Darkhast
                            join p in _dbContext.Parvandeh on d.shop equals p.shop into dp
                            from p in dp.DefaultIfEmpty()
                            select new
                            {
                                shodarkhast = d.shodarkhast,
                                shParvandeh = d.shop,
                                cNosazi = p.codeN,
                                shape = d.Shape.AsText()
                            }).ToList();

                return Json(new { success = true, data = list }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetAllDarkhast()
        {
            try
            {
                var list = (from d in _dbContext.DarkhastGIS
                            select new
                            {
                                d.shodarkhast,
                                shParvandeh = d.shop,
                                cNosazi = d.codeN,
                                shape = d.Shape
                            }).ToList();

                var listWithShape = new List<object>();
                var listWithoutShape = new List<object>();

                foreach (var d in list)
                {
                    if (d.shape == null)
                        listWithoutShape.Add(new
                        {
                            d.shodarkhast,
                            d.shParvandeh,
                            d.cNosazi,
                            shape = (string)null
                        });
                    else
                        listWithShape.Add(new
                        {
                            d.shodarkhast,
                            d.shParvandeh,
                            d.cNosazi,
                            shape = d.shape.AsText()
                        });
                }

                return Json(new { success = true, listWithShape, listWithoutShape }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetAllDarkhastBatch1(int skip = 0, int batchSize = 100)
        {
            try
            {
                var query = _dbContext.DarkhastGIS
                    .OrderBy(d => d.shodarkhast)
                    .Skip(skip)
                    .Take(batchSize)
                    .Select(d => new
                    {
                        d.shodarkhast,
                        shParvandeh = d.shop,
                        cNosazi = d.codeN,
                        shape = d.Shape
                    })
                    .ToList();
                var listWithShape = new List<object>();
                var listWithoutShape = new List<object>();

                foreach (var d in query)
                {
                    if (d.shape == null)
                    {
                        listWithoutShape.Add(new
                        {
                            d.shodarkhast,
                            d.shParvandeh,
                            d.cNosazi,
                            shape = (string)null
                        });
                    }
                    else
                    {
                        listWithShape.Add(new
                        {
                            d.shodarkhast,
                            d.shParvandeh,
                            d.cNosazi,
                            shape = d.shape.AsText()
                        });
                    }
                }

                var totalCount = _dbContext.DarkhastGIS.Count();

                return Json(new
                {
                    success = true,
                    skip,
                    batchSize,
                    totalCount,
                    listWithShape,
                    listWithoutShape
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetAllDarkhastBatch(int skip = 0, int batchSize = 100)
        {
            try
            {
                var batch = _dbContext.DarkhastGIS
                    .OrderBy(d => d.shodarkhast)
                    .Skip(skip)
                    .Take(batchSize)
                    .Select(d => new
                    {
                        d.shodarkhast,
                        shParvandeh = d.shop,
                        cNosazi = d.codeN,
                        shape = d.Shape
                    })
                    .ToList();

                var listWithShape = new List<object>();
                var listWithoutShape = new List<object>();

                foreach (var d in batch)
                {
                    if (d.shape == null)
                    {
                        listWithoutShape.Add(new
                        {
                            d.shodarkhast,
                            d.shParvandeh,
                            d.cNosazi,
                            shape = (string)null
                        });
                    }
                    else
                    {
                        listWithShape.Add(new
                        {
                            d.shodarkhast,
                            d.shParvandeh,
                            d.cNosazi,
                            shape = d.shape.AsText()
                        });
                    }
                }

                var totalCount = _dbContext.DarkhastGIS.Count();

                return Json(new
                {
                    success = true,
                    skip,
                    batchSize,
                    totalCount,
                    listWithShape,
                    listWithoutShape
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
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