import List "mo:core/List";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Iter "mo:core/Iter";

actor {
  type LeaderboardEntry = {
    name : Text;
    score : Nat;
  };

  type Reward = {
    name : Text;
    score : Nat;
    rank : ?Nat;
  };

  module LeaderboardEntry {
    public func compareByScoreDescending(a : LeaderboardEntry, b : LeaderboardEntry) : Order.Order {
      Nat.compare(b.score, a.score);
    };
  };

  let leaderboard = List.empty<LeaderboardEntry>();

  public shared ({ caller }) func submitScore(name : Text, score : Nat) : async () {
    let filteredIter = leaderboard.values().filter(
      func(entry) {
        not (entry.name == name and entry.score == score);
      }
    );
    let filteredList = List.fromIter<LeaderboardEntry>(filteredIter);
    leaderboard.clear();
    leaderboard.addAll(filteredList.values());
    leaderboard.add({ name; score });
  };

  public query ({ caller }) func getTopScores() : async [LeaderboardEntry] {
    let sorted = leaderboard.sort(LeaderboardEntry.compareByScoreDescending);
    let top5Iter = sorted.values().take(5);
    top5Iter.toArray();
  };

  public query ({ caller }) func claimReward(score : Nat) : async ?Reward {
    let sorted = leaderboard.sort(LeaderboardEntry.compareByScoreDescending);
    let rankings = sorted.toArray();
    var foundRank : ?Nat = null;
    var i = 0;

    while (i < rankings.size()) {
      if (rankings[i].score == score) {
        foundRank := ?(i + 1);
        i := rankings.size();
      } else {
        i += 1;
      };
    };

    ?{
      name = "Reward";
      score;
      rank = foundRank;
    };
  };
};
