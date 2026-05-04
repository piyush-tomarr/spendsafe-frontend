import React, { useState, useEffect, useCallback } from 'react'

const today = new Date().toISOString().split('T')[0]

const Expances = () => {
  const [startDate, setstartDate] = useState(today)
  const [endDate, setendDate] = useState(today)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchTransactions = useCallback(async (sdate, edate) => {
    setLoading(true)
    setError('')
    setTransactions([])
    try {
      const res = await fetch(
        `http://localhost:2003/wallet/transaction-history/54?startDate=${encodeURIComponent(sdate + ' 00:00:00')}&endDate=${encodeURIComponent(edate + ' 23:59:59')}`
      )
      const data = await res.json()
      if (res.status === 404) {
        setError('No transactions found for this date range.')
      } else {
        // 👇 newest time first
        setTransactions(data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)))
      }
    } catch (err) {
      setError('Failed to fetch transactions. Is your server running?')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const currentToday = new Date().toISOString().split('T')[0]
    setstartDate(currentToday)
    setendDate(currentToday)
    fetchTransactions(currentToday, currentToday)
  }, [fetchTransactions])

  const handleFetchTransactionHistory = (e) => {
    e.preventDefault()
    fetchTransactions(startDate, endDate)
  }

  const formatDate = (iso) => new Date(iso).toLocaleDateString()
  const formatTime = (iso) => new Date(iso).toLocaleTimeString()

  return (
    <>
      <div>
        <div className="min-h-auto flex justify-center items-center p-4 sm:p-8 font-sans">
          <div className="rounded-2xl border border-slate-200 p-6 sm:p-10 w-full max-w-4xl bg-blue-50">

            {/* Dots */}
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-200 my-4"></div>

            {/* Title */}
            <h1 className="text-xl font-semibold text-slate-800 mb-1 font-arvo">Transaction History</h1>
            <p className="text-xs text-slate-400 mb-6">Select a date range to review your records</p>

            {/* Form Row */}
            <form className="flex flex-col sm:flex-row gap-4 sm:items-end" onSubmit={handleFetchTransactionHistory}>

              <div className="flex-1">
                <label className="block text-xs font-semibold text-blue-500 uppercase tracking-widest mb-1.5">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  required
                  max={today}
                  className="w-full px-3.5 py-2.5 border border-blue-200 rounded-xl text-sm text-slate-800 bg-white outline-none focus:border-blue-500"
                  value={startDate}
                  onChange={(e) => setstartDate(e.target.value)}
                />
              </div>

              <div className="flex-1">
                <label className="block text-xs font-semibold text-green-500 uppercase tracking-widest mb-1.5">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  required
                  max={today}
                  className="w-full px-3.5 py-2.5 border border-green-200 rounded-xl text-sm text-slate-800 bg-white outline-none focus:border-green-500"
                  value={endDate}
                  onChange={(e) => setendDate(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                {loading ? 'Loading...' : 'Review'}
              </button>

            </form>

            {/* Error */}
            {error && (
              <p className="mt-4 text-sm text-red-500 font-medium">{error}</p>
            )}

            {/* Loading skeleton */}
            {loading && (
              <div className="mt-6 space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 bg-slate-200 animate-pulse rounded-lg"></div>
                ))}
              </div>
            )}

            {/* Table */}
            {!loading && transactions.length > 0 && (
              <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-100 text-slate-500 uppercase text-xs tracking-wider">
                    <tr>
                      <th className="px-4 py-3 font-arvo">Date</th>
                      <th className="px-4 py-3 font-arvo">Time</th>
                      <th className="px-4 py-3 font-arvo">Amount</th>
                      <th className="px-4 py-3 font-arvo">Type</th>
                      <th className="px-4 py-3 font-arvo">Status</th>
                      <th className="px-4 py-3 font-arvo">Category</th>
                      <th className="px-4 py-3 font-arvo">Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="bg-white hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-slate-700">{formatDate(tx.created_at)}</td>
                        <td className="px-4 py-3 text-slate-500">{formatTime(tx.created_at)}</td>
                        <td className="px-4 py-3 font-semibold text-slate-800">₹{tx.amount}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                            tx.transaction_type === 'credit'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-600'
                          }`}>
                            {tx.transaction_type}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                            tx.status === 'success'
                              ? 'bg-green-100 text-green-700'
                              : tx.status === 'pending'
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-red-100 text-red-600'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600 capitalize">{tx.category}</td>
                        <td className="px-4 py-3 text-slate-500">{tx.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  )
}

export default Expances