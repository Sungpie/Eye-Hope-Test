const { withPodfile } = require("expo/config-plugins");

module.exports = function withFirebaseStaticPod(config) {
  return withPodfile(config, (podfileConfig) => {
    const newContent = `
  # React Native Firebase - 정적 링킹 설정
  use_frameworks! :linkage => :static
`;

    // use_frameworks!를 찾아 새 내용으로 교체
    const contents = podfileConfig.modResults.contents;
    if (contents.includes("use_frameworks!")) {
      podfileConfig.modResults.contents = contents.replace(
        /use_frameworks!/g,
        newContent
      );
      console.log("✅ Podfile의 use_frameworks! 설정을 정적 링킹으로 변경했습니다.");
    } else {
      console.log("⚠️ Podfile에 use_frameworks! 설정이 없어 변경하지 않았습니다.");
    }
    
    return podfileConfig;
  });
};