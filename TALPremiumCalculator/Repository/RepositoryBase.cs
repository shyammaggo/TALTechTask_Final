using System.Collections.Generic;
using System.Linq;
using Contracts;
using Entities;
using Microsoft.EntityFrameworkCore;


namespace Repository
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected RepositoryContext RepositoryContext;
        public RepositoryBase(RepositoryContext repositoryContext)
        {
            this.RepositoryContext = repositoryContext;
        }

        public void Create(T entity)
        {
            this.RepositoryContext.Set<T>().Add(entity);
        }

        public IEnumerable<T> ListAllInsuredPersons()
        {
            return this.RepositoryContext.Set<T>().ToList();
        }
    }
}
