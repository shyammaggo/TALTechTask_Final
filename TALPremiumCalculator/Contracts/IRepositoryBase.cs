using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace Contracts
{
    public interface IRepositoryBase<T>
    {
        IEnumerable<T> ListAllInsuredPersons();

        void Create(T entity);

    }
}
