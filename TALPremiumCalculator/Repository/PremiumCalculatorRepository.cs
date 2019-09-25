using System;
using System.Collections.Generic;
using System.Text;
using Contracts;
using Entities;
using Entities.Models;
using System.Linq;

namespace Repository
{
   public  class PremiumCalculatorRepository: IPremiumCalculator
    {
        public decimal CalculatePremium(PremiumCalculator premiumInfo)
        {
            throw new NotImplementedException();
        }

        //public PremiumCalculatorRepository(RepositoryContext repositoryContext)
        //    : base(repositoryContext)
        //{ }





        public IEnumerable<Occupation> GetOccupationList()
        {
            var occupationList = new List<Occupation>();// The below list will come from the database.
            occupationList.Add(new Occupation { factor = 1.50M, occupationName = "Cleaner" });
            occupationList.Add(new Occupation { factor = 1.0M, occupationName = "Doctor" });
            occupationList.Add(new Occupation { factor = 1.25M, occupationName = "Author" });
            occupationList.Add(new Occupation { factor = 1.75M, occupationName = "Farmer" });
            occupationList.Add(new Occupation { factor = 1.75M, occupationName = "Mechanic" });//1.75
            occupationList.Add(new Occupation { factor = 1.50M, occupationName = "Florist" });//1.50

            return occupationList;
        }

      
    }
}
