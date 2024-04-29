import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import LearnOverlay from "../components/UI/LearnOverlay";
import {CharacterContext} from "../store/character-context";
import Character from "../model/Character";

const LearnDetails = ({route, navigation}) => {
    const subjectMap = [
        {
            "id":"19",
            "subjectName":"Math"
        },
        {
            "id":"18",
            "subjectName":"Coding"
        },
        {
            "id":"10",
            "subjectName":"Literature"
        },
        {
            "id":"9",
            "subjectName":"General knowledge"
        },
    ]
    const charCtx = useContext(CharacterContext);
    const subjectId = route.params.subjectId;
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [point, setPoint] = useState(0);
    const [isOverlayVisible, setIsVisible] = useState(false);

    const findSubjectNameById = (id) => {
        const subject = subjectMap.find(item => item.id === id);
        return subject ? subject.subjectName : null;
    };

    useEffect(() => {
        fetchQuiz();
    }, []);

    const fetchQuiz = async () => {
        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${subjectId}&type=multiple`);
            const data = await response.json();
            setQuestions(data.results.map(decodeSpecialChars));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching quiz:', error);
        }
    };

    const decodeSpecialChars = (question) => {
        return {
            ...question,
            question: decodeURIComponent(question.question),
            correct_answer: decodeURIComponent(question.correct_answer),
            incorrect_answers: question.incorrect_answers.map(option => decodeURIComponent(option)),
        };
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleNextQuestion = () => {
        if (selectedOption === questions[currentQuestionIndex].correct_answer) {
            setPoint(oldPoint => oldPoint+1)
        }
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
        } else {
            setIsVisible(true)
        }
    };

    const onClaims = () => {
        const skillName = findSubjectNameById(subjectId);
        let char = charCtx.playingCharacter;
        if (char instanceof Character) {
            let hasSkill = false;
            for (item of char.skill) {
                if (item.name === skillName) {
                    hasSkill = true;
                }
            }
            if (hasSkill) {
                const foundedItem = char.skill.find(item => {
                    return item.name === skillName;
                })
                foundedItem.point += point;
            } else {
                char.skill.push({
                    name: skillName,
                    point: point,
                })
            }
            charCtx.updateChar(char)
        }
        setIsVisible(!isOverlayVisible);
        navigation.navigate("Home")
    }

    const renderQuestion = () => {
        const question = questions[currentQuestionIndex];
        return (
            <View style={styles.questionContainer}>
                <Text style={styles.questionText}>{question.question}</Text>
                <View style={styles.optionsContainer}>
                    {question.incorrect_answers.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.optionButton,
                                selectedOption === option ? styles.selectedOption : null,
                            ]}
                            onPress={() => handleOptionSelect(option)}>
                            <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        style={[
                            styles.optionButton,
                            selectedOption === question.correct_answer ? styles.selectedOption : null,
                        ]}
                        onPress={() => handleOptionSelect(question.correct_answer)}>
                        <Text style={styles.optionText}>{question.correct_answer}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleNextQuestion}>
                    <Text style={styles.nextButtonText}>Next Question</Text>
                </TouchableOpacity>
                <LearnOverlay isVisible={isOverlayVisible} onClose={onClaims} point={point} subjectName={findSubjectNameById(subjectId)}/>

            </View>
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3498db" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {questions.length > 0 ? renderQuestion() : <Text>No questions available</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    questionText: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    optionButton: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        margin: 5,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#3498db',
    },
    selectedOption: {
        backgroundColor: '#3498db',
        color: "white"
    },
    optionText: {
        fontSize: 16,
        color: '#3498db',
        fontWeight: 'bold',
    },
    nextButton: {
        backgroundColor: '#3498db',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    nextButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LearnDetails;
