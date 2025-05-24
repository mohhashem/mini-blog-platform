﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Post
    {
        public int id { get; set; }
        public string title { get; set; }
        public string content { get; set; }
        public string author { get; set; }
        public DateTime createdAt { get; set; }
        public bool isPublished { get; set; }
    }
}
