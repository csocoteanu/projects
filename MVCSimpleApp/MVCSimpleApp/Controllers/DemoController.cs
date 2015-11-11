using MVCSimpleApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVCSimpleApp.Controllers
{
    public class DemoController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.UsageSample = @"Please Use the Url 'Demo/Test' or 'Demo/Test/1' to see the Book Details";

            return View();
        }

        public ActionResult Test()
        {
            List<Book> books = new List<Book>();

            Book book1 = new Book
            {
                ID = 1,
                BookName = "Design Pattern by GoF",
                AuthorName = "GoF",
                ISBN = "NA"
            };
            Book book2 = new Book
            {
                ID = 1,
                BookName = "Design Pattern by GoF..2",
                AuthorName = "GoF..2",
                ISBN = "NA..2"
            };

            books.Add(book1);
            books.Add(book2);

            ViewBag.Model = books;

            return View(books);
        }
    }
}


