#include <numeric>
#include <thread>
#include <vector>
#include "pi.h"

using namespace std;

namespace
{
    /**
     * Leibniz formula for π: 1 - 1/3 + 1/5 - 1/7 + 1/9 - ...
     */
    double calculate_pi(uint64_t const start, uint64_t const end)
    {
        double sum = 0;
        for (uint64_t i = start; i < end; i++)
        {
            int const sign = i % 2 ? -1 : 1;
            double const term = 2 * i + 1;
            sum += sign / term;
        }
        return 4 * sum;
    }

    /**
     * Subdivide PI calculations among multiple threads.
     */
    double calculate_pi_multithreaded(uint64_t const iterations,
                                      size_t const num_threads = thread::hardware_concurrency())
    {
        vector<thread *> threads(num_threads);
        uint64_t const chunk = iterations / num_threads;
        vector<double> sums(num_threads);

        for (size_t i = 0; i < num_threads; i++)
        {
            threads[i] = new thread([=, &sums]()
                                    {
                                        auto const result = calculate_pi(i * chunk, (i + 1) * chunk);
                                        sums[i] = result;
                                    });
        }

        for (thread *t : threads)
        {
            t->join();
            delete t;
        }

        // Sort high-to-low for more precise (and consistent) summing of fractions.
        sort(sums.begin(), sums.end(), [](double a, double b)
             { return b < a; });
        return accumulate(sums.begin(), sums.end(), 0.0);
    }
}

namespace cppmodule
{
    double calculate(uint64_t iterations)
    {
        return calculate_pi_multithreaded(iterations);
    }

    unsigned int concurrency()
    {
        return thread::hardware_concurrency();
    }
}
