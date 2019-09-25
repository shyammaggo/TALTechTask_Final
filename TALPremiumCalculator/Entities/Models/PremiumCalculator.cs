using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Entities.Models
{
    public class PremiumCalculator
    {
       
        public string insuredName { get; set; }
        public int age { get; set; }
        public DateTime dateOfBirth { get; set; }
        public int sumInsured { get; set; }
        public decimal premiumAmount { get; set; }
    }
    
    public class Occupation
    {
        public string occupationName { get; set; }
        public decimal factor { get; set; }
    }   

}
