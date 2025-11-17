#include <bits/stdc++.h>
using namespace std;
using namespace chrono;
#define ll long long
#define fast ios_base::sync_with_stdio(false); cin.tie(NULL);
#define Test ll T; cin >> T; while (T--)
#define d '\n'
#define Vout(a) for (const auto &val : a) cout << val << ' ';
#define Vin(a) for(auto &val : a){cin>>val;}
#define all(a) a.begin(),a.end()
bool isPrime(ll n){if (n <= 1) return false;ll count = 0;for (ll i = 1; i * i <= n; i++){if (n % i == 0){count++; if (i != n / i) count++;}}return (count == 2);}

void solve()
{
    cout<<86%16<<d;
}

int main()
{
   // #ifndef ONLINE_JUDGE
   //     freopen("input.txt", "r", stdin);
   //     freopen("output.txt", "w", stdout);
   // #endif

   fast;
   solve();

   return 0;
}