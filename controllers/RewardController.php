<?php
class RewardController {
    private $rewardModel;

    public function __construct($rewardModel) {
        $this->rewardModel = $rewardModel;
    }

    public function getRewards($user_id) {
        $rewards = $this->rewardModel->getRewardById($user_id);
        echo json_encode($rewards);
    }

    public function getRewardPoints($user_id) {
        $rewards = $this->rewardModel->getRewards();
        $reward_points = 0;
        foreach ($rewards as $reward) {
            if ($reward['user_id'] == $user_id) {
                $reward_points += $reward['reward_points'];
            }
        }
        return $reward_points;
    }
}