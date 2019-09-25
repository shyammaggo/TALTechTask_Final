using Contracts;
using Microsoft.AspNetCore.Mvc;
using System;

namespace TALPremiumCalculator.Controllers
{
    [Route("api/[controller]/[action]")]
    public class PremiumCalculatorController : Controller
    {

        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;


        public class PremiumInfoDTO
        {

            public string insuredName { get; set; }
            public int age { get; set; }
            public DateTime dateOfBirth { get; set; }
            public int sumInsured { get; set; }
            public decimal Factor { get; set; }
            public decimal premiumAmount { get; set; }

        }
        public PremiumCalculatorController(ILoggerManager logger, IRepositoryWrapper repository)
        {
            _logger = logger;
            _repository = repository;
        }


        [HttpGet]
        public IActionResult GetOccupationList()
        {
            try
            {
                var occupationList = _repository.premiumCalculator.GetOccupationList();
                _logger.LogInfo($"returned all occupationlist from the databae.");
                return Ok(occupationList);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetAllChequePayees action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }

        }

        [HttpPost]
        public decimal CalculatePremium([FromBody] PremiumInfoDTO info)
        {
            try { 
            // This logic can be moved to Datbase procedure and call should be thru Repository pattern. 
            return (info.sumInsured * info.Factor * info.age) / 1000 * 12;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetAllChequePayees action: {ex.Message}");
                return -1;
          
            }
        }
    }
}