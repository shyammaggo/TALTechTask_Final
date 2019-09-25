using System;
using System.Collections.Generic;
using LoggerService;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Contracts;
using Entities;
using TALPremiumCalculator.Controllers;
using Entities.Models;
using static TALPremiumCalculator.Controllers.PremiumCalculatorController;

namespace TALPremiumCalculatorUnitTest
{
    [TestClass]
    public class PremiumCalculatorControllerUnitTest
    {
         
        PremiumInfoDTO pc1;
        PremiumInfoDTO pc2;
       
        Occupation oc1;
        Occupation oc2;


        private LoggerManager _logger;
        private Mock<IRepositoryWrapper> _repository;
        private List<PremiumInfoDTO> PremiumInfoList;
        private List<Occupation> OccupationList;

        PremiumCalculatorController ctrl;
        
        public PremiumCalculatorControllerUnitTest()
        {
            pc1 = new PremiumInfoDTO {  age = 10, dateOfBirth = DateTime.Now.AddDays(-100), Factor = 1.50M, sumInsured = 100000 };
            pc2 = new PremiumInfoDTO { age = 10, dateOfBirth = DateTime.Now.AddDays(-100), Factor = 1.25M, sumInsured = 100000 };

            PremiumInfoList= new List<PremiumInfoDTO>();
            PremiumInfoList.Add(pc1);
           

            oc1 = new Occupation { factor = 1.10M, occupationName = "Author" };
            oc2 = new Occupation { factor = 1.75M, occupationName = "Writer" };

            OccupationList = new List<Occupation>();
            OccupationList.Add(oc1);
            OccupationList.Add(oc2);


            _logger = new LoggerManager();
            _repository = new Mock<IRepositoryWrapper>();
            ctrl = new PremiumCalculatorController(_logger, _repository.Object);

        }


        [TestMethod]
        public void GetOccupationLIstOK()
        {
            //mocking
            _repository.Setup(r => r.premiumCalculator.GetOccupationList()).Returns(OccupationList);
            //Action
            var response = ctrl.GetOccupationList() as ObjectResult;
            List<Occupation> data = response.Value as List<Occupation>;

            //Assert
            Assert.AreEqual(200, response.StatusCode);
            CollectionAssert.Contains(data, oc1);
            CollectionAssert.Contains(data, oc2);
        }

        [TestMethod]
        public void TestGetOccupationListsInternalServerError()
        {
            //didn't setup mocking to raise error
           //Action
            var response = ctrl.GetOccupationList() as ObjectResult;
           //Assert
            Assert.AreEqual(500, response.StatusCode);
        }

        [TestMethod]
        public void TestCalculatePremiumOK()
        {
            decimal calculatedPremiumAmount=0;
            calculatedPremiumAmount = ctrl.CalculatePremium(pc1) ;
            Assert.IsTrue(calculatedPremiumAmount > 0, "Premium Amount is an integer.");
        }
        [TestMethod]
        public void TestCalculateError()
        {
            decimal calculatedPremiumAmount = 0;
            //Pass invalid values for age, facor, sumInsured to return ZERO premium
            pc2 = new PremiumInfoDTO { age = 0, dateOfBirth = DateTime.Now.AddDays(-100), Factor = 0.0M, sumInsured = 0 };
            calculatedPremiumAmount = ctrl.CalculatePremium(pc2);
            Assert.IsTrue(calculatedPremiumAmount <= 0, "Premium Amount is not calculated.");
        }
    }
}

