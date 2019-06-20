using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Employee_WebAPI.Controllers
{
    public class HomeController : Controller
    {
        private EmployeeDBContext db = new EmployeeDBContext();
        //[Route("Index1")]
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
        public ActionResult AddEmployee()
        {
            ViewBag.Title = "Add Employee";

            var departments = new SelectList(db.Departments.ToList(), "Id", "Name");
            ViewData["Departments"] = departments;

            return View();
        }
        [HttpPost]
        public ActionResult AddEmployee(DAL.Model.Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return View(employee);
            }
            var departments = new SelectList(db.Departments.ToList(), "Id", "Name");
            ViewData["Departments"] = departments;

            db.Employees.Add(employee);
            db.SaveChanges();

            return View();
        }
    }
}
